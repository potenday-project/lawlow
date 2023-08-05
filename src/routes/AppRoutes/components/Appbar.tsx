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
});

const StyledToolbar = styled(MuiToolbar)({
  display: "inline-flex",
  justifyContent: "space-between",
});

interface Props {
  isLogIn: boolean;
}

const AppBar = ({ isLogIn }: Props) => {
  const navigate = useNavigate();

  const handleClickLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Typography sx={{ color: "black" }}>로우로우</Typography>
        {!isLogIn && <Button onClick={handleClickLogin}>로그인</Button>}
        {isLogIn && <Button>로그아웃</Button>}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default AppBar;
