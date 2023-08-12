import React, { ReactElement } from "react";

import { Box, Typography } from "@mui/material";
import styled from "styled-components";

import LoadingDots from "@/assets/svg/LoadingDots";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 4px;

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

interface Props {
  text: string;
}
const Fallback = ({ text }: Props): ReactElement => {
  return (
    <StyledSection>
      <LoadingDots />
      <Box className="text-container">
        <Typography>{text}</Typography>
        <Typography>잠시만 기다려 주세요</Typography>
      </Box>
    </StyledSection>
  );
};

export default Fallback;
