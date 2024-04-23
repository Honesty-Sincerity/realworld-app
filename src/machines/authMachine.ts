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
    performLogin: fromCallback(({ input, sendBack }: { input: SignInPayload; sendBack: any }) => {
      console.log("dataa---->>>", input);
      httpClient
        .post(`https://localhost:${backendPort}/login`, input)
        .then(({ data }) => {
          history.push("/");
          sendBack(data);
        })
        .catch(() => {
          sendBack({ message: "Username or password is invalid" });
          // throw new Error("Username or password is invalid");
        });
    }),
    performSignup: fromCallback(({ input, sendBack }) => {
      console.log("singup dataa---->>>", input);
      // const payload = omit("type", input)
      // httpClient.
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
          return {
            password: event.password,
            username: event.username,
            remember: event.remember,
          };
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
