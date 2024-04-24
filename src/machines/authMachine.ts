import { SignInPayload, SignUpPayload, User } from "@models/user";
import { httpClient } from "@utils/asyncUtils";
import { history } from "@utils/historyUtils";
import { backendPort } from "@utils/portUtils";
import { omit } from "lodash";
import { assign, fromCallback, setup } from "xstate";

export interface AuthMachineContext {
  user?: User;
  message?: string;
}

export type AuthMachineEvents =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "UPDATE" }
  | { type: "REFRESH" }
  | { type: "SIGNUP" };

export const authMachine = setup({
  types: { context: {} as AuthMachineContext, events: {} as AuthMachineEvents },
  actions: {
    resetUser: assign(() => ({
      user: undefined,
    })),
  },
  actors: {
    performLogin: fromCallback(({ input, sendBack }) => {
      console.log("dataa---->>>", input);
      httpClient
        .post(`http://localhost:${backendPort}/login`, input)
        .then(({ data }) => {
          history.push("/");
          sendBack(data);
        })
        .catch(() => {
          // sendBack({ message: "Username or password is invalid" });
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
  },
  states: {
    unauthorized: {
      entry: "resetUser",
      on: {
        LOGIN: "loading",
        SIGNUP: "signup",
      },
    },
    loading: {
      invoke: {
        src: "performLogin",
        input: ({ event }: { event: any }) => {
          return omit(event, "type");
        },
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
