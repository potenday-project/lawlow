import React, { useCallback, useEffect, useState } from "react";

import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  styled,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router";

const StyledAppBar = styled(MuiAppBar)({
  backgroundColor: "transparent",
  boxShadow: "none",
});

const StyledToolbar = styled(MuiToolbar)({
  display: "inline-flex",
  justifyContent: "space-between",
});

const StyledButton = styled(Button)({
  padding: "8px 12px",
  borderRadius: "8px",
  background: "var(--primary-subtle, #F7F5FF)",
  border: "1px solid #3A00E5",

  // font
  color: "var(--primary, #3A00E5)",
  fontFamily: "Work Sans",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "16px",
  letterSpacing: "0.6px",
});

const AppBar = () => {
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
    <StyledAppBar>
      <StyledToolbar>
        <Typography onClick={handleClickLogo}>로우로우</Typography>
        {!isLogin && (
          <StyledButton onClick={handleClickLogin}>로그인</StyledButton>
        )}
        {isLogin && (
          <Avatar alt="profile" src={localStorage.getItem("picture") ?? ""} />
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default AppBar;
