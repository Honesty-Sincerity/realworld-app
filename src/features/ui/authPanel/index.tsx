import S from "./index.module.scss";
import { TfiFacebook, TfiGithub, TfiGoogle, TfiLinkedin } from "react-icons/tfi";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { object, reach, string } from "yup";

const signinValidationSchema = object({
  username: string().required("Username is required"),
  password: string().min(4, "Least 4 characters").required("Password is required"),
});

export const AuthPanel = () => {
  const [active, setActive] = useState<boolean>(false);
  const [activeLogin, setActiveLogin] = useState<boolean>(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      await signinValidationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.errors[0] }));
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      await signinValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {}
  };

  useEffect(() => {
    if (formData.password.length > 4 && formData.username) {
      setActiveLogin(true);
    } else {
      setActiveLogin(false);
    }
  }, [formData]);

  return (
    <div className={S.body}>
      <div className={S.wrapper}>
        <div className={clsx(S.signin, active && S.slideUp)}>
          <h2 className={S.formTitle}>Sign in</h2>
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
              value={formData.username}
              onChange={handleChange}
              placeholder="Name"
            />
            <span className={S.error}>{errors.username}</span>
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <span className={S.error}>{errors.password}</span>
          </label>
          <button onClick={handleLogin} disabled={!activeLogin}>
            Log in
          </button>
        </div>
        <div className={clsx(S.signup, !active && S.slideUp)}>
          <div className={S.center}>
            <h2 className={S.formTitle}>Sign up</h2>
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
            <span>or use your email for registration</span>
            <input type="text" name="" id="" placeholder="Name" />
            <input type="email" name="" id="" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Password" />
            <button>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};
