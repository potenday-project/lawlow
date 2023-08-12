import React, {
  ReactElement,
  Suspense,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";

import { ArrowBack, SettingsOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { PROFILE_TAB_INFOS } from "@/interface/profile";
import { SearchTabType } from "@/interface/search";

import Fallback from "../components/Fallback";
import Footer from "../components/Footer";

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

  .profile-area {
    display: flex;
    margin: 10px 20px;
    padding: 27px 12px 36px 12px;
    flex-direction: column;
    gap: 24px;
    border-radius: 20px;
    background: var(--yellow-2, #fdf3de);
    box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);

    .title-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;

      .title {
        color: var(--black-2, #3a3a3a);
        font-family: SUIT;
        font-size: 19px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      .MuiSvgIcon-root {
        color: var(--black-2, #3a3a3a);
      }
    }

    .other-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .google {
        height: 24px;
        display: flex;
        padding: 2px 7px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 15px;
        border: 1px solid var(--deep-orange, #ff7e20);
        color: var(--deep-orange, #ff7e20);
        font-family: SUIT;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 18px */
      }

      .p-area {
        display: flex;
        gap: 8px;
        align-items: center;

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
    }
  }

  .storage-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;

    .tab-container {
      width: 100%;

      .MuiTabs-root {
        height: 42px;
        background-color: #fffdfa;
        border-radius: 33px;
        display: inline-flex;
        padding: 5px 6px;
        width: 100%;
        box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);
        align-items: center;

        .MuiTabs-scroller {
          height: 32px;
        }

        .MuiTabs-indicator {
          display: none;
        }

        .MuiTab-root {
          height: 32px;
          min-height: 32px;
          flex: 1;
          background-color: transparent;
          color: var(--black-2, #3a3a3a) !important;
          text-align: center !important;
          font-family: SUIT !important;
          font-size: 14px !important;
          font-style: normal !important;
          font-weight: 700 !important;
          line-height: normal !important;

          &.Mui-selected {
            background-color: #fdf3de;
            border-radius: 33px;
            color: #ff7e20 !important;
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          }
        }
      }
    }

    .list-area {
      flex: 1;
    }
  }
`;

const LawList = (): ReactElement => {
  return <div>리스트 api 대기중</div>;
};

const MyProfile = (): ReactElement => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState<SearchTabType>("prec");

  const handleClickGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleChangeTabs = useCallback(
    (event: SyntheticEvent<Element, Event> | null, value: SearchTabType) => {
      setSelectedTab(value);
    },
    [],
  );

  const handleClickSetting = useCallback(() => {
    navigate("/my-profile-setting");
  }, []);

  return (
    <ContentWrapper>
      <Box className="title-area">
        <IconButton onClick={handleClickGoBack}>
          <ArrowBack />
        </IconButton>
        <p>마이 페이지</p>
      </Box>
      <Box className="profile-area">
        <Box className="title-container">
          <Typography className="title">나의 계정</Typography>
          <IconButton onClick={handleClickSetting}>
            <SettingsOutlined />
          </IconButton>
        </Box>
        <Box className="other-container">
          <Box className="p-area">
            <Avatar alt="profile" src={localStorage.getItem("picture") ?? ""} />
            <Box className="name-container">
              <Typography className="name">
                {localStorage.getItem("name")}
              </Typography>
              <Typography className="email">
                {localStorage.getItem("email")}
              </Typography>
            </Box>
          </Box>

          <Box className="google">구글 계정 로그인</Box>
        </Box>
      </Box>
      <Box className="storage-area">
        <Box className="tab-container">
          <Tabs
            value={selectedTab}
            onChange={handleChangeTabs}
            variant="fullWidth"
          >
            {PROFILE_TAB_INFOS.map((info) => (
              <Tab label={info.label} value={info.value} />
            ))}
          </Tabs>
        </Box>
        <Box className="list-area">
          <Suspense
            fallback={
              <Fallback
                text={`${
                  PROFILE_TAB_INFOS.find((x) => x.value === selectedTab)
                    ?.label ?? "저장한 내용"
                } 불러오는 중`}
              />
            }
          >
            <LawList />
          </Suspense>
        </Box>
      </Box>
      <Footer />
    </ContentWrapper>
  );
};

export default MyProfile;
