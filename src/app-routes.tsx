import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { appRoutesObj } from "./app.paths";
import { AuthProvider } from "./auth/user-context";
import PrivateRoute from "./pages/private-routes";
import LoginPage from "./pages/projects/login-page";

const ExamplePage = React.lazy(() => import("./pages/user/example-page"));
const NotFoundPage = React.lazy(() => import("./pages/404"));

const withSuspense = (WrappedComponent: JSX.Element) => {
  return (
    <Suspense
      fallback={<div className="text-primary-200 pt-10">Loading...</div>}
    >
      {WrappedComponent}
    </Suspense>
  );
};

export function AppRouting() {
  return (
    <Suspense
      fallback={<div className="text-primary-200 pt-10">Loading...</div>}
    >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              key="homepage"
              path={appRoutesObj.getBasePath()}
              element={withSuspense(<App />)} 
            />
            <Route
              key="userpage"
              path={appRoutesObj.getOperationPath()}
              element={withSuspense(<PrivateRoute />)}
            />
            <Route
              key="logInPage"
              path={appRoutesObj.logInPath()}
              element={withSuspense(<LoginPage />)}
            />
            <Route
              key="examplePage"
              path={appRoutesObj.getExamplePagePath()}
              element={withSuspense(<ExamplePage />)}
            />

            <Route
              key="notDefined"
              path="*"
              element={withSuspense(<NotFoundPage />)}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
}
