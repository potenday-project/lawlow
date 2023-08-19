import React, {
  ChangeEvent,
  ReactElement,
  Suspense,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";

import { observer } from "mobx-react-lite";

import { ArrowBack } from "@mui/icons-material";
import { IconButton, Typography, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useStore } from "@/stores";
import { SEARCH_TAB_INFOS, SearchTabType } from "@interface/search";

import SearchLawList from "./components/SearchLawList";
import Fallback from "../components/Fallback";
import Footer from "../components/Footer";
import SearchBarWithButton from "../components/SearchBarWithButton";

const ContentWrapper = styled.main`
  .search-area {
    padding: 0.5rem 1rem;
    display: inline-flex;
    gap: 0.5rem;
  }

  .tab-area {
    padding: 1.5rem 1rem 0rem 1rem;

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

  .total-area {
    width: 100%;
    display: inline-flex;
    padding: 18px 15px 6px 15px;
    align-items: flex-start;
    gap: 0.5rem;
    color: var(--black-2, #3a3a3a);
    font-family: SUIT;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 19.5px */
    letter-spacing: -0.2px;
    border-bottom: 0.5px solid var(--grey-1, #999897);
  }

  .list-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .MuiPaper-root {
      border-radius: 20px;
      padding: 8px 15px;

      display: flex;
      flex-direction: column;
      gap: 14px;

      font-family: Pretendard;
      font-style: normal;
      line-height: 15px;

      .title-area {
        font-size: 15px;
        font-weight: 500;
        display: inline-flex;
        justify-content: space-around;
        width: 100%;
        align-items: center;
      }

      .content {
        max-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 500;
      }

      .keywords {
        display: inline-flex;
        gap: 8px;
      }
    }
  }
`;

const Search = (): ReactElement => {
  const { mainStore } = useStore();
  const navigate = useNavigate();
  const [value, setValue] = useState(
    mainStore.searchWords[mainStore.searchWords.length - 1] ?? "",
  );

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const handleClickClear = useCallback(() => {
    setValue("");
  }, []);

  const handleClickGoBack = useCallback(() => {
    mainStore.popSearchWord();

    if (mainStore.searchWords.length > 0) {
      setValue(mainStore.searchWords[mainStore.searchWords.length - 1] ?? "");
    } else navigate("/");
  }, [mainStore.searchWords, navigate]);

  const handleClickSearchButton = useCallback(
    (v: string) => {
      mainStore.addSearchWord(v);
      setValue(v);
    },
    [mainStore.addSearchWord],
  );

  const handleChangeSelectedTab = useCallback(
    (
      event: SyntheticEvent<Element, Event> | null,
      v: string | number | null,
    ) => {
      mainStore.setSelectedTab(v as SearchTabType);
    },
    [mainStore.setSelectedTab],
  );

  return (
    <ContentWrapper className="under-appbar-content">
      <section className="search-area">
        <IconButton className="goback-button" onClick={handleClickGoBack}>
          <ArrowBack />
        </IconButton>
        <SearchBarWithButton
          value={value}
          onChange={handleTextFieldChange}
          onClear={handleClickClear}
          onClick={handleClickSearchButton}
          hasClear
        />
      </section>
      <section className="tab-area">
        <Tabs
          value={mainStore.selectedTab}
          onChange={handleChangeSelectedTab}
          variant="fullWidth"
        >
          {SEARCH_TAB_INFOS.map((info) => (
            <Tab key={info.value} value={info.value} label={info.label} />
          ))}
        </Tabs>
      </section>
      <section className="total-area">
        <Typography display="inline">전체 검색 결과</Typography>
        <Typography display="inline">{`${mainStore.totalElements.toLocaleString()}건`}</Typography>
      </section>
      <section className="list-area">
        <Suspense fallback={<Fallback text="검색 중" />}>
          <SearchLawList
            q={mainStore.searchWords[mainStore.searchWords.length - 1]}
          />
        </Suspense>
      </section>
      <Footer />
    </ContentWrapper>
  );
};

export default observer(Search);
