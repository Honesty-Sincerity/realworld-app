import { User } from "@models/user";
import { httpClient } from "@utils/asyncUtils";
import { history } from "@utils/historyUtils";
import { backendPort } from "@utils/portUtils";
import { omit } from "lodash";
import { assign, fromPromise, setup } from "xstate";

export interface AuthMachineContext {
  user?: User;
  message?: string;
  mode?: boolean;
}

export type AuthMachineEvents =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "UPDATE" }
  | { type: "REFRESH" }
  | { type: "SIGNUP" }
  | { type: "MODE"; value: boolean };

export const authMachine = setup({
  types: { context: {} as AuthMachineContext, events: {} as AuthMachineEvents },
  actions: {
    resetUser: assign(() => ({
      user: undefined,
    })),
    onError: assign(() => ({
      message: "Username or password is invalid",
    })),
    onChange: assign({
      mode: (event: any) => event.event.value,
    }),
    signinMode: assign({
      mode: false,
    }),
  },
  actors: {
    performLogin: fromPromise(async ({ input }) => {
      return await httpClient
        .post(`http://localhost:${backendPort}/login`, input)
        .then(({ data }) => {
          history.push("/");
          return data;
        })
        .catch(() => {
          throw new Error("Username or password is invalid");
        });
    }),
    performSignup: fromPromise(async ({ input }) => {
      return await httpClient
        .post(`http://localhost:${backendPort}/users`, input)
        .then(({ data }) => {
          return data;
        })
        .catch(() => {
          throw new Error("User already taken");
        });
    }),
  },
}).createMachine({
  id: "authentication",
  initial: "unauthorized",
  context: {
    user: undefined,
    message: undefined,
    mode: false,
  },
  states: {
    unauthorized: {
      entry: "resetUser",
      on: {
        LOGIN: "login",
        SIGNUP: "signup",
        MODE: {
          actions: "onChange",
        },
      },
    },
    login: {
      invoke: {
        src: "performLogin",
        input: ({ event }: { event: any }) => {
          return omit(event, "type");
        },
        onError: [
          {
            target: "unauthorized",
            actions: assign(() => {
              return {
                message: "Invalid user or password",
              };
            }),
          },
        ],
      },
    },
    signup: {
      invoke: {
        src: "performSignup",
        input: ({ event }: { event: any }) => {
          return omit(event, "type", "confirmPassword");
        },
        onDone: {
          actions: "signinMode",
        },
        onError: [
          {
            target: "unauthorized",
            actions: assign(() => {
              return { message: "User already" };
            }),
          },
        ],
      },
    },
  },
});
