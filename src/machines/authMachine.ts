import { SignInPayload, SignUpPayload, User } from "@models/user";
import { httpClient } from "@utils/asyncUtils";
import { history } from "@utils/historyUtils";
import { backendPort } from "@utils/portUtils";
import { omit } from "lodash";
import { assign, fromCallback, fromPromise, setup } from "xstate";

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
      mode: (event: any) => {
        console.log(event.event.value);
        return event.event.value;
      },
    }),
  },
  actors: {
    performLogin: fromPromise(async ({ input }) => {
      return await httpClient
        .post(`http://localhost:${backendPort}/login`, input)
        .then(({ data }) => {
          console.log("here correct");
          history.push("/");
          return data;
        })
        .catch((error) => {
          console.log("errrrrrrr", error);
          throw new Error("Username or password is invalid");
        });
    }),
    performSignup: fromCallback(({ input, sendBack }) => {
      httpClient.post(`http://localhost:${backendPort}/users`, input).then(({ data }) => {
        history.push("/signin");
        sendBack(data);
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
            actions: assign(({ event }) => {
              console.log("user", event);
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
          return omit(event, "type");
        },
      },
    },
  },
});
