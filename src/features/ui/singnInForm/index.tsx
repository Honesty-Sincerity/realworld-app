import S from "./index.module.scss";
import { SignInPayload } from "@models/user";
import { useActor } from "@xstate/react";

export function SignInForm({ authMachine }: { authMachine: any }) {
  const initialValues: SignInPayload = {
    username: "",
    password: "",
    remember: undefined,
  };
  const [authState, send] = useActor(authMachine);
  return <main className={S.signInContainer}></main>;
}
