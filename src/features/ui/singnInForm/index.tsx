import S from "./index.module.scss";
import { SignInPayload } from "@models/user";
import { useActor } from "@xstate/react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";

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
  // const [authState, send] = useActor(authMachine);

  // const signInPending = (payload: SignInPayload) => send({ type: "LOGIN", ...payload });

  return (
    <main className={S.signInContainer}>
      <div className={S.paper}>
        <h5>Sign In</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            // si;
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Field type="text" name="username" data-testid="signin-username" />
              <Field type="password" name="password" data-testid="signin-password" />
              <button type="submit" disabled={isSubmitting} data-testid="signin-submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
