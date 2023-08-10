import React, { ReactElement, useCallback, useEffect, useState } from "react";

import {
  GoogleLogin,
  GoogleOAuthProvider,
  UserDataWithCredential,
} from "@moeindana/google-oauth";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

const ContentWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Login = (): ReactElement => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("credential") !== null &&
      localStorage.getItem("credential") !== "",
  );

  const navigate = useNavigate();

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

      window.dispatchEvent(new Event("storage"));

      navigate("/");
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
    <ContentWrapper>
      <Box onClick={handleClickLogo}>lawlow</Box>
      {!isLogin && (
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
      )}
    </ContentWrapper>
  );
};

export default Login;
