import React, { useCallback, useEffect, useState } from "react";

import {
  AppBar as MuiAppBar,
  Button,
  styled,
  Avatar,
  Toolbar,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";

import MainLogo from "@/assets/svg/MainLogo";

const StyledAppBar = styled(MuiAppBar)<{ location: string }>(
  ({ location }) => ({
    background: location === "/" ? "transparent" : "#fff",
    boxShadow: "none",

    " .MuiToolbar-root": {
      display: "inline-flex",
      justifyContent: location === "/" ? "flex-end" : "space-between",
    },

    " .login": {
      display:
        location === "/login" ||
        location === "/my-profile" ||
        location === "/my-profile-setting"
          ? "none"
          : "flex",
    },
  }),
);

const StyledButton = styled(Button)({
  padding: "8px 12px",
  borderRadius: "19px",
  background: "var(--grey-3, rgba(225, 221, 209, 0.42))",

  // font
  color: "var(--deep-orange, #FF7E20)",
  fontFamily: "SUIT",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
});

const AppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("credential") !== null &&
      localStorage.getItem("credential") !== "",
  );

  const handleClickLogo = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleClickLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleClickProfile = useCallback(() => {
    navigate("/my-profile");
  }, [navigate]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(
        localStorage.getItem("credential") !== null &&
          localStorage.getItem("credential") !== "",
      );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <StyledAppBar location={location.pathname}>
      <Toolbar>
        {location.pathname !== "/" && (
          <Box onClick={handleClickLogo}>
            <MainLogo />
          </Box>
        )}
        {!isLogin && (
          <StyledButton className="login" onClick={handleClickLogin}>
            로그인
          </StyledButton>
        )}
        {isLogin && (
          <Avatar
            className="login"
            onClick={handleClickProfile}
            alt="profile"
            src={localStorage.getItem("picture") ?? ""}
          />
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
