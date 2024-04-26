import S from "./index.module.scss";
import { TfiFacebook, TfiGithub, TfiGoogle, TfiLinkedin } from "react-icons/tfi";
import clsx from "clsx";
import { useState } from "react";

export const AuthPanel = () => {
  const [active, setActive] = useState<boolean>(true);

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
          <input type="text" name="" id="" placeholder="Name" />
          <input type="password" name="" id="" placeholder="Password" />
          <button>Log in</button>
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
