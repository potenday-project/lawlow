import React, {
  ReactElement,
  Suspense,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";

import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

import { DETAIL_TAB_INFOS, DetailTabType } from "@/interface/searchDetail";
import { useStore } from "@/stores";

import AiTabPanel from "./components/AiTabPanel";
import TabPanel from "./components/TabPanel";
import Fallback from "../components/Fallback";
import Footer from "../components/Footer";

const ContentWrapper = styled.main`
  .original-area {
    flex: 1;
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
      padding: 0px 20px;

      p {
        width: 100%;
        text-align: center;
        padding-right: 40px;
      }
    }

    .original-data-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px 20px;

      .fallback-container {
        flex: 1;
        display: flex;
      }

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
    }
  }
`;

const SearchDetail = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mainStore } = useStore();
  const [title, titleSetter] = useState("");

  const [selectedTab, setSelectedTab] =
    useState<DetailTabType<typeof mainStore.selectedTab>>("ai");

  const handleClickGoBack = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  const handleChangeTabs = useCallback(
    (
      event: SyntheticEvent<Element, Event> | null,
      value: DetailTabType<typeof mainStore.selectedTab>,
    ) => {
      setSelectedTab(value);
    },
    [setSelectedTab],
  );

  const setTitle = useCallback((t: string) => {
    titleSetter(t);
  }, []);

  return (
    <ContentWrapper className="under-appbar-content">
      <Box className="original-area">
        <Box className="title-area">
          <IconButton onClick={handleClickGoBack}>
            <ArrowBack />
          </IconButton>
          {title === "" ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: "60%",
                height: "32px",
                borderRadius: "33px",
              }}
            />
          ) : (
            <p>{title}</p>
          )}
        </Box>
        <Box className="original-data-area">
          <Box className="tab-container">
            <Tabs
              value={selectedTab}
              onChange={handleChangeTabs}
              variant="fullWidth"
            >
              {DETAIL_TAB_INFOS[mainStore.selectedTab].map((info) => (
                <Tab label={info.label} value={info.value} />
              ))}
            </Tabs>
          </Box>
          <Suspense
            fallback={
              <Box
                className="fallback-container"
                sx={{
                  display: selectedTab !== "ai" ? "none !important" : "flex",
                }}
              >
                <Fallback text="쉬운 말 번역 중" />
              </Box>
            }
          >
            <AiTabPanel
              selectedSearchTab={mainStore.selectedTab}
              selectedValue={selectedTab}
              value="ai"
              id={id ?? ""}
            />
          </Suspense>
          <Suspense
            fallback={
              <Box
                className="fallback-container"
                sx={{
                  display:
                    (mainStore.selectedTab === "prec" ? "prec" : "statute") !==
                    selectedTab
                      ? "none !important"
                      : "flex",
                }}
              >
                <Fallback
                  text={`${
                    mainStore.selectedTab === "prec" ? "판례" : "법령"
                  } 검색중`}
                />
              </Box>
            }
          >
            <TabPanel
              selectedSearchTab={mainStore.selectedTab}
              selectedValue={selectedTab}
              value={mainStore.selectedTab === "prec" ? "prec" : "statute"}
              id={id ?? ""}
              setTitle={setTitle}
            />
          </Suspense>
        </Box>
      </Box>
      <Footer />
    </ContentWrapper>
  );
};

export default SearchDetail;
