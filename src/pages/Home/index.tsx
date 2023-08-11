import { ReactElement, useCallback, useEffect, useRef } from "react";

import { observer } from "mobx-react-lite";

import {
  Box,
  IconButton,
  Paper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router";
import styled from "styled-components";

import LawlowUseText from "@/assets/svg/LawlowUseText";
import MainBackground from "@/assets/svg/MainBackground";
import MainPageLogo from "@/assets/svg/MainPageLogo";
import ScrollUpIcon from "@/assets/svg/ScrollUpIcon";
import SearchIcon from "@/assets/svg/SearchIcon";
import Slider1 from "@/assets/svg/Slider1";
import Slider2 from "@/assets/svg/Slider2";
import Slider3 from "@/assets/svg/Slider3";
import Slider4 from "@/assets/svg/Slider4";
import { useStore } from "@stores/index";

const Wrapper = styled.div`
  height: 100vh;
  background: rgba(255, 126, 32, 1);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }

  .section-one {
    background: #fff;
    border-radius: 0px 0px 50px 50px;

    .main-logo-area {
      flex: 2;
      align-items: center;
      display: flex;
      display: flex;
    }

    .main-background-area {
      width: 100%;
      height: 289px;
    }

    .bottom-area {
      max-height: 210px;
      display: flex;
      flex-direction: column;
      width: 100%;

      .search-area {
        display: inline-flex;
        width: 100%;
        padding: 20px;
        gap: 10px;

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

      .scroll-up-area {
        justify-content: center;
        display: flex;
        padding: 20px;
      }
    }
  }

  .section-two {
    .title-area {
      width: 100%;
      padding: 87px 20px 35px 20px;
      display: inline-flex;

      color: var(--white-1, #fff);
      font-family: Jalnan;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px; /* 68.75% */
    }

    .slider-area {
      flex: 1;
      width: 100%;
      padding: 20px;

      .carousel {
        .CarouselItem {
          display: flex;
          justify-content: center;
        }

        .Carousel-buttonWrapper-6 {
          height: 400px;
          top: -10%;
          .MuiIconButton-root {
            color: #fff;
          }
        }

        .Carousel-indicators-2 {
          display: flex;
          justify-content: center;
          align-items: baseline;
          margin-top: 30px;

          .Carousel-active-5 {
            color: rgb(255, 188, 16);
          }
        }

        .MuiPaper-root {
          border-radius: 64.125px;
          background: var(--white-1, #fff);
          width: 257px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;

const Home = (): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<TextFieldProps | null>(null);
  const { mainStore } = useStore();

  const navigate = useNavigate();
  const handleClickSearchButton = useCallback(() => {
    mainStore.resetSearchWords();
    mainStore.addSearchWord(inputRef.current?.value as string);
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
        <Box className="bottom-area">
          <Box className="search-area">
            <TextField
              fullWidth
              size="small"
              inputRef={inputRef}
              placeholder="키워드 또는 사건번호 입력"
            />
            <IconButton onClick={handleClickSearchButton}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box className="scroll-up-area">
            <ScrollUpIcon />
          </Box>
        </Box>
      </section>
      <section className="section-two">
        <Box className="title-area">
          <LawlowUseText />
        </Box>
        <Box className="slider-area">
          <Carousel
            className="carousel"
            autoPlay
            navButtonsAlwaysVisible
            animation="slide"
          >
            <Paper>
              <Slider1 />
            </Paper>
            <Paper>
              <Slider2 />
            </Paper>
            <Paper>
              <Slider3 />
            </Paper>
            <Paper>
              <Slider4 />
            </Paper>
          </Carousel>
        </Box>
      </section>
    </Wrapper>
  );
};

export default observer(Home);
