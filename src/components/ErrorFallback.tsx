import { useCallback, useState } from "react";

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorFallbackProps } from "@/interface/error";

const ContentWrapper = styled.main`
  background: #fff;
  width: 390px;
  height: 844px;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  .msg {
    font-family: SUIT;
    font-size: 20px;
    font-weight: 500;
  }

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

const ERROR_MAP: { [key: string]: string } = {
  "q should not be empty": "검색어는 비어 있으면 안돼요.😢",
  "ThrottlerException: Too Many Requests": "너무 많은 요청이 들어왔어요.😢",
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const [msg] = useState(() => {
    if (error.name === "AxiosError") {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const m = error.response?.data.errorMessage ?? ([] as string[]);
      const mArr = m
        .map((x) => {
          if (x in ERROR_MAP) return ERROR_MAP[x as keyof typeof ERROR_MAP];
          if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(x)) return x;
          return [];
        })
        .flat();
      if (mArr.length > 0) return mArr;
    }
    return ["원인 모를 에러가 발생했어요.😢"];
  });

  const navigate = useNavigate();

  const handleClickGoHome = useCallback(() => {
    navigate("/");
    resetErrorBoundary();
  }, []);

  return (
    <ContentWrapper>
      <Typography className="msg">{msg}</Typography>
      <Button onClick={handleClickGoHome}>홈으로 이동하기</Button>
    </ContentWrapper>
  );
};

export default ErrorFallback;
