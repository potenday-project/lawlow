import React, { ReactElement } from "react";

import { Box, Typography } from "@mui/material";
import styled from "styled-components";

import NoResultIcon from "@/assets/svg/NoResultIcon";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background: var(--grey-2, #ececec);

  .text-container {
    color: var(--grey-1, #999897);
    text-align: center;
    font-family: SUIT !important;
    font-size: 19px !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: normal !important;
  }
`;

const NoResult = (): ReactElement => {
  return (
    <StyledSection>
      <NoResultIcon />
      <Box className="text-container">
        <Typography>검색 결과가 없습니다</Typography>
        <Typography>새로운 검색어를 입력해 주세요</Typography>
      </Box>
    </StyledSection>
  );
};

export default NoResult;
