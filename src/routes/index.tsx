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
          const Search = await import("@pages/Search");
          return { Component: Search.default };
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
