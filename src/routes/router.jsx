/**
 * @file This file defines the routes for the application using react-router-dom.
 * It includes lazy loading for the components to improve performance.
 */

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "../components/ProtectedRoute";

/**
 * Lazy-loaded App component. This is the main component for the home page.
 * @type {React.LazyExoticComponent<() => JSX.Element>}
 */
const App = lazy(() => import("../pages/App"));
const LandingPage = lazy(() => import("../pages/LandingPage"));

/**
 * Lazy-loaded Signup component.
 * @type {React.LazyExoticComponent<() => JSX.Element>}
 */
const Signup = lazy(() => import("../pages/Signup"));

const Login = lazy(() => import("../pages/Login"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const PostPage = lazy(() => import("../pages/PostPage"));

/**
 * Lazy-loaded NotFoundPage component. This component is displayed for 404 errors.
 * @type {React.LazyExoticComponent<() => JSX.Element>}
 */
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

/**
 * The application's router configuration.
 * @type {import("react-router-dom").Router}
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <App />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Settings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/post/:postId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <PostPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export default router;
