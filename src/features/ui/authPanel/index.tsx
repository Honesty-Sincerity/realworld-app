import S from "./index.module.scss";
import { TfiFacebook, TfiGithub, TfiGoogle, TfiLinkedin } from "react-icons/tfi";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { object, string } from "yup";
import { useMachine } from "@xstate/react";
import { authMachine } from "@machines/authMachine";
import { SignUpPayload } from "@models/user";

const signinValidationSchema = object({
  username: string().required("Username is required"),
  password: string().min(4, "Least 4 characters").required("Password is required"),
});

const signupValidationSchema = object({
  firstName: string().required("FirstName is required"),
  lastName: string().required("LastName is required"),
  username: string().required("Username is required"),
  email: string().email("Invalid eamil format"),
  password: string().min(4, "Least 4 characters").required("Enter your password"),
  confirmPassword: string().required("Confirm your password"),
});

export const AuthPanel = () => {
  const [state, send] = useMachine(authMachine);
  const [activeSignin, setActiveSignin] = useState<boolean>(false);
  const [activeSignup, setActiveSignup] = useState<boolean>(false);
  const [signinFormData, setSigninFormData] = useState({ username: "", password: "" });
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signinErrors, setSigninErrors] = useState<{ [key: string]: string }>({});
  const [signupErrors, setSignupErrors] = useState<{ [key: string]: string }>({});

  const handleSigninChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      await signinValidationSchema.validateAt(name, { [name]: value });
      setSigninErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error: any) {
      setSigninErrors((prevErrors) => ({ ...prevErrors, [name]: error.errors[0] }));
    }
    setSigninFormData({ ...signinFormData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      await signinValidationSchema.validate(signinFormData, { abortEarly: false });
      setSigninErrors({});
    } catch (err) {}
  };

  useEffect(() => {
    if (signinFormData.password.length > 4 && signinFormData.username) {
      setActiveSignin(true);
    } else {
      setActiveSignin(false);
    }
  }, [signinFormData]);

  const handleSignupChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      await signupValidationSchema.validateAt(name, { [name]: value });
      if (name === "confirmPassword" && value !== signupFormData.password) {
        setSignupErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "No mached" }));
      } else {
        setSignupErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    } catch (error: any) {
      setSignupErrors((prevErrors) => ({ ...prevErrors, [name]: error.errors[0] }));
    }
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const signUpPending = (payload: SignUpPayload) => send({ type: "SIGNUP", ...payload });

  const handleSignup = async () => {
    try {
      await signupValidationSchema.validate(signupFormData, { abortEarly: false });
      setSignupErrors({});
      signUpPending(signupFormData);
    } catch (err) {}
  };

  useEffect(() => {
    if (
      signupFormData.password.length > 4 &&
      signupFormData.password === signupFormData.confirmPassword &&
      signupFormData.username &&
      signupFormData.firstName &&
      signupFormData.lastName &&
      signupFormData.email
    ) {
      setActiveSignup(true);
    } else {
      setActiveSignup(false);
    }
  }, [signupFormData]);

  return (
    <div className={S.body}>
      <div className={S.wrapper}>
        <div className={clsx(S.signin, state.context.mode && S.slideUp)}>
          <h2
            className={S.formTitle}
            data-testid="signin-handle"
            onClick={() => send({ type: "MODE", value: false })}
          >
            Sign in
          </h2>
          <div className={S.socialHolder}>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <TfiGoogle size={20} />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <TfiLinkedin size={20} />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <TfiGithub size={20} />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <TfiFacebook size={20} />
            </a>
          </div>
          <span>or use your account</span>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              value={signinFormData.username}
              onChange={handleSigninChange}
              placeholder="Name"
            />
            <span className={S.error}>{signinErrors.username}</span>
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              value={signinFormData.password}
              onChange={handleSigninChange}
              placeholder="Password"
            />
            <span className={S.error}>{signinErrors.password}</span>
          </label>
          <button onClick={handleLogin} disabled={!activeSignin}>
            Log in
          </button>
        </div>
        <div className={clsx(S.signup, !state.context.mode && S.slideUp)}>
          <div className={S.center}>
            <h2
              className={S.formTitle}
              data-testid="signup-handle"
              onClick={() => send({ type: "MODE", value: true })}
            >
              Sign up
            </h2>
            {state.context.mode && (
              <>
                <div className={S.socialHolder} data-testid="signup-social">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <TfiGoogle size={20} />
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <TfiLinkedin size={20} />
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <TfiGithub size={20} />
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <TfiFacebook size={20} />
                  </a>
                </div>
                <span>or use your email for registration</span>
                <label htmlFor="firstName">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    data-testid="signup-firstName"
                    value={signupFormData.firstName}
                    onChange={handleSignupChange}
                    placeholder="FirstName"
                  />
                  <span className={S.error} data-testid="signup-error-firstName">
                    {signupErrors.firstName}
                  </span>
                </label>
                <label htmlFor="lastName">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    data-testid="signup-lastName"
                    value={signupFormData.lastName}
                    onChange={handleSignupChange}
                    placeholder="LastName"
                  />
                  <span className={S.error} data-testid="signup-error-lastName">
                    {signupErrors.lastName}
                  </span>
                </label>
                <label htmlFor="username">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    data-testid="signup-username"
                    value={signupFormData.username}
                    onChange={handleSignupChange}
                    placeholder="Username"
                  />
                  <span className={S.error} data-testid="signup-error-username">
                    {signupErrors.username}
                  </span>
                </label>
                <label htmlFor="email">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    data-testid="signup-email"
                    value={signupFormData.email}
                    onChange={handleSignupChange}
                    placeholder="Email"
                  />
                  <span className={S.error} data-testid="signup-error-email">
                    {signupErrors.email}
                  </span>
                </label>
                <label htmlFor="password">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    data-testid="signup-password"
                    value={signupFormData.password}
                    onChange={handleSignupChange}
                    placeholder="Password"
                  />
                  <span className={S.error} data-testid="signup-error-password">
                    {signupErrors.password}
                  </span>
                </label>
                <label htmlFor="confirmPassword">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    data-testid="signup-confirmPassword"
                    value={signupFormData.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder="Confirm"
                  />
                  <span className={S.error} data-testid="signup-error-confirmPassword">
                    {signupErrors.confirmPassword}
                  </span>
                </label>
                <button data-testid="signup-button" onClick={handleSignup} disabled={!activeSignup}>
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
