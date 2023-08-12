import { useCallback } from "react";

import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

const ContentWrapper = styled.main`
  position: absolute;
  top: 56px;
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;

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
`;

const NotFound = () => {
  const navigate = useNavigate();

  const handleClickGoHome = useCallback(() => {
    navigate("/", { replace: true });
  }, []);

  return (
    <ContentWrapper>
      <Box>🚧404🚧 존재하지 않는 페이지에요😢</Box>
      <Button onClick={handleClickGoHome}>홈으로 돌아가기</Button>
    </ContentWrapper>
  );
};

export default NotFound;
