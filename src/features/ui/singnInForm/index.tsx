import { authMachine } from "@machines/authMachine";
import S from "./index.module.scss";
import { SignInPayload } from "@models/user";
import { useActor, useMachine } from "@xstate/react";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { object, string } from "yup";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const validationSchema = object({
  username: string().required("Username is required"),
  password: string()
    .min(4, "Password must contain at least 4 characters")
    .required("Enter your password"),
});

export function SignInForm() {
  const initialValues: SignInPayload = {
    username: "",
    password: "",
    remember: undefined,
  };
  const [authState, send] = useMachine(authMachine);

  const signInPending = (payload: SignInPayload) => send({ type: "LOGIN", ...payload });

  useEffect(() => {
    console.log("auth message", authState.context.message);
  }, [authState]);

  return (
    <main className={S.signInContainer}>
      <div className={S.paper}>
        {authState.context.message && (
          <div className={S.alert}>
            <AiOutlineInfoCircle className={S.alertIcon} />
          </div>
        )}
        <h5>Sign In</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log("values", values);
            signInPending(values);
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Field type="text" name="username" data-testid="signin-username" />
              <Field type="password" name="password" data-testid="signin-password" />
              <input type="checkbox" name="" id="" data-test="signin-remember-me" />
              <button type="submit" disabled={!isValid || isSubmitting} data-testid="signin-submit">
                Submit
              </button>
              <div className="">
                <Link to="/signup" data-test="signup">
                  Don't have an account? Sign Up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
