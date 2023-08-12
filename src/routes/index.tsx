/* eslint-disable react/no-unstable-nested-components */
import { Suspense } from "react";

import {
  // useQueryErrorResetBoundary,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";

import AppRoutes from "./AppRoutes";

const ErrorLayer = () => {
  return (
    <Suspense>
      <QueryErrorResetBoundary>
        {() => (
          <ErrorBoundary fallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorLayer />,
    children: [
      {
        path: "",
        index: true,
        async lazy() {
          const Home = await import("@pages/Home");
          return { Component: Home.default };
        },
      },
      {
        path: "login",
        async lazy() {
          const Login = await import("@pages/Login");
          return { Component: Login.default };
        },
      },
      {
        path: "my-profile",
        async lazy() {
          const Profile = await import("@pages/MyProfile");
          return { Component: Profile.default };
        },
      },
      {
        path: "my-profile-setting",
        async lazy() {
          const ProfileSetting = await import("@pages/MyProfileSetting");
          return { Component: ProfileSetting.default };
        },
      },
      {
        path: "search",
        async lazy() {
          const Search = await import("@pages/Search");
          return { Component: Search.default };
        },
      },
      {
        path: "search/:id",
        async lazy() {
          const SearchDetail = await import("@pages/SearchDetail");
          return { Component: SearchDetail.default };
        },
      },
      {
        path: "*",
        async lazy() {
          const NotFound = await import("@pages/NotFound");
          return { Component: NotFound.default };
        },
      },
    ],
  },
]);

export default router;
