import { ReactElement, useCallback, useEffect, useRef } from "react";

import { observer } from "mobx-react-lite";

import { ArrowUpward } from "@mui/icons-material";
import { Box, IconButton, TextField, TextFieldProps } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

import MainBackground from "@/assets/svg/MainBackground";
import MainPageLogo from "@/assets/svg/MainPageLogo";
import { useStore } from "@stores/index";

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }

  .section-one {
    display: flex;
    flex-direction: column;

    .main-logo-area {
      flex: 1;
      display: flex;
      padding: 10%;
      display: flex;
      align-items: center;
    }

    .main-background-area {
      width: 100%;
      height: 289px;
    }

    .search-area {
      flex: 1;
      align-items: flex-end;
      width: 100%;
      padding: 20px;
      display: flex;

      .container {
        display: inline-flex;
        width: 100%;
        gap: 0.5rem;
        padding-bottom: 45px;
      }

      .MuiInputBase-root {
        border-radius: 28px;
        border: 2px solid var(--orange, #ffbc10);
        background: var(--grey-3, rgba(225, 221, 209, 0.42));
        box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);

        &.Mui-focused {
          & .MuiOutlinedInput-notchedOutline {
            border-color: #ff7e20;
          }
        }

        .MuiInputBase-input {
          color: #000;
        }
      }

      .MuiIconButton-root {
        background-color: rgba(255, 188, 16, 1);
        color: #ffffff;
        box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);
      }
    }
  }

  .section-two {
    background-color: yellow;
  }

  .section-three {
    background-color: blue;
  }
`;

const Home = (): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<TextFieldProps | null>(null);
  const { mainStore } = useStore();

  const navigate = useNavigate();
  const handleClickSearchButton = useCallback(() => {
    mainStore.setSearchWord(inputRef.current?.value as string);
    navigate("/search");
  }, [navigate]);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();

      const { deltaY } = e;
      const scrollTop = ref.current?.scrollTop ?? 0;
      const pageHeight = window.innerHeight;

      // 스크롤 내릴 때
      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          ref.current?.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          ref.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          ref.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      }
      // 스크롤 올릴 때
      else {
        // eslint-disable-next-line no-lonely-if
        if (scrollTop > pageHeight * 2) {
          ref.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop > pageHeight && scrollTop <= pageHeight * 2) {
          ref.current?.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else {
          ref.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    const { current } = ref;
    current?.addEventListener("wheel", wheelHandler);
    return () => {
      current?.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <Wrapper ref={ref}>
      <section className="section-one">
        <Box className="main-logo-area">
          <MainPageLogo />
        </Box>
        <Box className="main-background-area">
          <MainBackground />
        </Box>
        <div className="search-area">
          <Box className="container">
            <TextField
              fullWidth
              size="small"
              inputRef={inputRef}
              placeholder="키워드 또는 사건번호 입력"
            />
            <IconButton onClick={handleClickSearchButton}>
              <ArrowUpward />
            </IconButton>
          </Box>
        </div>
      </section>
      <section className="section-two">2</section>
      <section className="section-three">3</section>
    </Wrapper>
  );
};

export default observer(Home);
