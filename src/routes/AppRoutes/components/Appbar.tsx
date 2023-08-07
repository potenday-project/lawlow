import React, { useCallback } from "react";

import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  styled,
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

interface Props {
  isLogIn: boolean;
}

const AppBar = ({ isLogIn }: Props) => {
  const navigate = useNavigate();

  const handleClickLogo = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleClickLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Typography sx={{ color: "black" }} onClick={handleClickLogo}>
          로우로우
        </Typography>
        {!isLogIn && (
          <StyledButton onClick={handleClickLogin}>로그인</StyledButton>
        )}
        {isLogIn && <StyledButton>로그아웃</StyledButton>}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default AppBar;
