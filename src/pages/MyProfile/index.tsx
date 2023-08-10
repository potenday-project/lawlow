import React, { ReactElement, useCallback } from "react";

import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

const ContentWrapper = styled.main`
  width: 100vw;
  height: 100vh;
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

  .profile-area {
    display: flex;
    padding: 20px;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;

    .name-container {
      .name {
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 15px;
      }

      .email {
        font-family: Pretendard;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 15px;
      }
    }
  }

  .title {
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 83.333% */
    letter-spacing: 0.4px;
  }

  .storage-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .recent-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
`;

const MyProfile = (): ReactElement => {
  const navigate = useNavigate();

  const handleClickGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleClickLogout = useCallback(() => {
    navigate("/");
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
  }, [navigate]);

  return (
    <ContentWrapper>
      <Box className="title-area">
        <IconButton onClick={handleClickGoBack}>
          <ArrowBack />
        </IconButton>
        <p>마이 페이지</p>
      </Box>
      <Box className="profile-area">
        <Avatar alt="profile" src={localStorage.getItem("picture") ?? ""} />
        <Box className="name-container">
          <Typography className="name">
            {localStorage.getItem("name")}
          </Typography>
          <Typography className="email">
            {localStorage.getItem("email")}
          </Typography>
        </Box>
        <Button onClick={handleClickLogout}>로그아웃</Button>
      </Box>
      <Box className="storage-area">
        <Typography className="title">보관함</Typography>
        {/* @TODO 명세 나오면 더 구현 */}
        <Box>보관함 리스트</Box>
      </Box>
      <Box className="recent-area">
        <Typography className="title">최근 본 판례</Typography>
        {/* @TODO 명세 나오면 더 구현 */}
        <Box>최근 본 판례 리스트</Box>
      </Box>
    </ContentWrapper>
  );
};

export default MyProfile;
