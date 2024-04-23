import { useMachine } from "@xstate/react";
import S from "./index.module.scss";
import { authMachine } from "@machines/authMachine";
import { Field, Form, Formik } from "formik";
import { SignUpPayload } from "@models/user";
import { object, ref, string } from "yup";
import { Link } from "react-router-dom";

const initialValues: SignUpPayload & { confirmPassword: string } = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  username: string().required("Username is required"),
  password: string()
    .min(4, "Password must contain at least 4 characters")
    .required("Enter your password"),
  confirmPassword: string()
    .required("Confirm your password")
    .oneOf([ref("password")], "Password does not match"),
});

export function SignUpForm() {
  const [, send] = useMachine(authMachine);

  const signUpPending = (payload: SignUpPayload) => send({ type: "SIGNUP", ...payload });

  return (
    <main className={S.signInContainer}>
      <div className={S.paper}>
        <h5>Sign In</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log("values", values);
            signUpPending(values);
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Field type="text" name="firstName" data-testid="signup-first-name" />
              <Field type="text" name="lastName" data-testid="signup-last-name" />
              <Field type="text" name="username" data-testid="signup-username" />
              <Field type="password" name="password" data-testid="signup-password" />
              <Field type="password" name="confirmPassword" data-testid="signup-confirmPassword" />
              <button type="submit" disabled={!isValid || isSubmitting} data-testid="signup-submit">
                Submit
              </button>
              <div className="">
                <Link to="/signin" data-test="signin">
                  Have an account? Sign In
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
