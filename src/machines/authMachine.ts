import { User } from "@models/user";
import { httpClient } from "@utils/asyncUtils";
import { history } from "@utils/historyUtils";
import { backendPort } from "@utils/portUtils";
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
      httpClient
        .post(`https://localhost:${backendPort}/login`, input)
        .then(({ data }) => {
          history.push("/");
          sendBack(data);
        })
        .catch(() => {
          throw new Error("Username or password is invalid");
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
      },
    },
    loading: {
      invoke: {
        src: "performLogin",
      },
    },
  },
});
