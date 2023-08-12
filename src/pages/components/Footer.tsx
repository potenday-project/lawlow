import React, { ReactElement, useCallback, useEffect, useState } from "react";

import { Box, Button, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

import GreyLogo from "@/assets/svg/GreyLogo";

const StyledFooter = styled.section`
  background: var(--grey-2, #ececec);
  display: flex;
  padding: 55px 58px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 22px;

  .button-container {
    display: inline-flex;

    .MuiButton-root {
      color: var(--black-2, #3a3a3a);
      font-family: SUIT;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;

const Footer = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("credential") !== null &&
      localStorage.getItem("credential") !== "",
  );

  const handleClickLogout = useCallback(() => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    if (location.pathname === "/my-profile") navigate(-1);
  }, []);

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
    <StyledFooter>
      <Box className="button-container">
        {isLogin && (
          <>
            <Button onClick={handleClickLogout}>로그아웃</Button>
            <Divider orientation="vertical" variant="middle" flexItem />
          </>
        )}
        <Button>이용약관</Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button>개인정보처리방침</Button>
      </Box>
      <Box>
        <GreyLogo />
      </Box>
    </StyledFooter>
  );
};

export default Footer;
