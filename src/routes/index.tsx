import React from "react";

import { createBrowserRouter } from "react-router-dom";
import { styled } from "styled-components";

import AppRoutes from "./AppRoutes";

const TodoContainer = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 500;
`;

const TodoPage = () => {
  return <TodoContainer>⚙️작업중⚙️</TodoContainer>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    children: [
      {
        path: "",
        index: true,
        Component: TodoPage,
      },
      {
        path: "login",
        async lazy() {
          const Login = await TodoPage;
          return { Component: Login };
        },
      },
      {
        path: "signin",
        async lazy() {
          const Signin = await TodoPage;
          return { Component: Signin };
        },
      },
      {
        path: "my-profile",
        async lazy() {
          const Profile = await TodoPage;
          return { Component: Profile };
        },
      },
      {
        path: "search",
        async lazy() {
          const Search = await TodoPage;
          return { Component: Search };
        },
      },
      {
        path: "*",
        async lazy() {
          const NotFound = await TodoPage;
          return { Component: NotFound };
        },
      },
    ],
  },
]);

export default router;
