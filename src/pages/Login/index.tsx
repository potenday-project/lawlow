import React, { ReactElement, useCallback, useEffect, useState } from "react";

import {
  GoogleLogin,
  GoogleOAuthProvider,
  UserDataWithCredential,
} from "@moeindana/google-oauth";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

import usePostAuth from "@/api/postAuth";
import MainPageLogo from "@/assets/svg/MainPageLogo";

const ContentWrapper = styled.main`
  .title-area {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 15px;
    padding: 0px 20px;

    p {
      width: 100%;
      text-align: center;
      padding-right: 40px;
    }
  }

  .logo-area {
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    .text {
      background-image: linear-gradient(
        to bottom,
        transparent 50%,
        #fff27a 50%
      );
      color: var(--black, #1b1b1b);
      font-family: SUIT;
      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }

  .login-area {
    flex: 1;
    display: flex;
    justify-content: center;
    padding-top: 70px;
  }
`;

const Login = (): ReactElement => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("credential") !== null &&
      localStorage.getItem("credential") !== "",
  );

  const { mutate } = usePostAuth();

  const navigate = useNavigate();

  const handleClickGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickLogo = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleGoogleLoginOnSuccess = useCallback(
    (res: UserDataWithCredential) => {
      localStorage.clear();
      localStorage.setItem("email", res.email ?? "");
      localStorage.setItem("name", res.name ?? "");
      localStorage.setItem("picture", res.picture ?? "");
      localStorage.setItem("credential", res.credential ?? "");

      mutate(
        {
          login_type: "google",
          token: res.credential ?? "",
        },
        {
          onSuccess: (response) => {
            localStorage.setItem("accessToken", response.accessToken ?? "");
            window.dispatchEvent(new Event("storage"));
            navigate(-1);
          },
        },
      );
    },
    [],
  );

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
    <ContentWrapper className="under-appbar-content">
      <Box className="title-area">
        <IconButton onClick={handleClickGoBack}>
          <ArrowBack />
        </IconButton>
        <p>로그인</p>
      </Box>
      <Box className="logo-area" onClick={handleClickLogo}>
        <MainPageLogo />
      </Box>
      <Box className="text-area">
        <Box className="text">로그인하고, 필요한 판례를</Box>
        <Box className="text">저장하고 관리해보세요!</Box>
      </Box>
      {!isLogin && (
        <Box className="login-area">
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGOLE_LOGIN_CLIENT_ID ?? ""}
          >
            <GoogleLogin
              onSuccess={handleGoogleLoginOnSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              cancel_on_tap_outside
            />
          </GoogleOAuthProvider>
        </Box>
      )}
    </ContentWrapper>
  );
};

export default Login;
