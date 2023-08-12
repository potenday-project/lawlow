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
          const NotFound = await TodoPage;
          return { Component: NotFound };
        },
      },
    ],
  },
]);

export default router;
