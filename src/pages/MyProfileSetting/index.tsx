import { ReactElement, useCallback } from "react";

import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

import GoogleIcon from "@/assets/svg/GoogleIcon";

const ContentWrapper = styled.main`
  position: absolute;
  top: 56px;
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;

  .title-area {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 15px;

    .MuiIconButton-root {
      position: absolute;
      left: 20px;
    }
  }

  .content-area {
    display: flex;
    flex-direction: column;
    gap: 54px;
    padding: 27px 20px;

    .content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .title {
        color: #000;
        font-family: SUIT;
        font-size: 17px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      .content {
        display: flex;
        flex-direction: row;
        border-radius: 20px;
        background: var(--yellow-2, #fdf3de);
        box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);
        gap: 20px;
        padding: 24px 20px;
        align-items: center;

        .text {
          color: #000;
          font-family: SUIT;
          font-size: 15px;
          font-style: normal;
          font-weight: 700;
          line-height: 170%; /* 25.5px */
          letter-spacing: -0.2px;
        }
      }
    }
  }

  .button-area {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .MuiButton-root {
      height: 40px;
      width: 60%;
      border-radius: 15.867px;
      background: var(--orange, #ffbc10);
      color: var(--black-2, #3a3a3a);
      font-family: SUIT;
      font-size: 14.733px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 22.1px */
      letter-spacing: -0.227px;
    }
  }
`;

const MyProfileSetting = (): ReactElement => {
  const navigate = useNavigate();

  const handleClickGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickLogout = useCallback(() => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  }, [navigate]);
  return (
    <ContentWrapper>
      <Box className="title-area">
        <IconButton onClick={handleClickGoBack}>
          <ArrowBack />
        </IconButton>
        <p>계정 관리</p>
      </Box>
      <Box className="content-area">
        <Box className="content-wrapper">
          <Typography className="title">나의 계정</Typography>
          <Box className="content">
            <Avatar alt="profile" src={localStorage.getItem("picture") ?? ""} />
            <Typography className="text">
              {localStorage.getItem("name")}
            </Typography>
          </Box>
        </Box>
        <Box className="content-wrapper">
          <Typography className="title">나의 계정</Typography>
          <Box className="content">
            <GoogleIcon />
            <Typography className="text">
              {localStorage.getItem("name")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="button-area">
        <Button onClick={handleClickLogout}>로그아웃</Button>
      </Box>
    </ContentWrapper>
  );
};

export default MyProfileSetting;
