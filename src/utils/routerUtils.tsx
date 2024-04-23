import { SignInForm } from "@features/ui";
import { BrowserHistory } from "history";
import { ReactNode, useLayoutEffect, useState } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";

export const RouterWrap = ({
  basename,
  children,
  history,
}: {
  basename?: string;
  children: ReactNode;
  history: BrowserHistory;
}) => {
  const [state, setState] = useState({ action: history.action, location: history.location });

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      {children}
    </Router>
  );
};

export const AuthRouter = () => {
  return (
    <Routes>
      <Route index path="/signin" element={<SignInForm />} />
      <Route index path="/*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};
