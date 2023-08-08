import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { observer } from "mobx-react-lite";

import { ArrowUpward } from "@mui/icons-material";
import { Tabs, TabList, Tab } from "@mui/joy";
import {
  Divider,
  IconButton,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import styled from "styled-components";

import { useStore } from "@/stores";
import {
  SEARCH_TAB_INFOS,
  SORT_TYPE_INFOS,
  SearchTabType,
  SortType,
} from "@interface/search";

const ContentWrapper = styled.main`
  position: absolute;
  top: 56px;
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;

  .search-area {
    padding: 0.5rem 1rem;
    display: inline-flex;
    gap: 0.5rem;

    .MuiInputBase-root {
      background-color: #ffffff;
      border-radius: 33px;
      border: 1px solid #3a00e5;
    }

    .MuiIconButton-root {
      background-color: #3a00e5;
      color: #ffffff;
    }
  }

  .tab-area {
    padding: 1.5rem 1rem 0rem 1rem;

    .MuiTabList-root {
      background-color: #eae3fe;
      border-radius: 33px;
      display: inline-flex;
      padding: 5px 10px;

      .MuiTab-root {
        flex: 1;
        background-color: transparent;
        color: #000;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 11px; /* 68.75% */
        opacity: 0.6;

        &.Mui-selected {
          background-color: #3a00e5;
          border-radius: 33px;
          color: #fff;

          opacity: 1;
          transition: opacity 0.4s ease-in-out;
        }
      }
    }
  }

  .top-area {
    display: inline-flex;
    padding: 11px 1rem;
    justify-content: space-between;

    .total-area {
      display: inline-flex;
      gap: 0.5rem;
      color: #000;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 15px; /* 107.143% */
    }

    .MuiTabs-root {
      width: 150px;
      background-color: transparent;
      .MuiTabList-root {
        background-color: transparent;
        display: inline-flex;

        .MuiTab-root {
          flex: 1;
          background-color: transparent;
          color: #000;
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 15px; /* 68.75% */
          opacity: 0.6;

          &.Mui-selected {
            font-weight: 700;

            opacity: 1;
            transition: opacity 0.4s ease-in-out;
          }
        }
      }
    }
  }
`;

const Search = (): ReactElement => {
  const { mainStore } = useStore();
  const inputRef = useRef<TextFieldProps | null>(null);

  /** @TODO list GET api */

  const handleClickSearchButton = useCallback(() => {
    mainStore.setSearchWord(inputRef.current?.value as string);
  }, [mainStore]);

  const handleChangeSelectedTab = useCallback(
    (
      event: SyntheticEvent<Element, Event> | null,
      value: string | number | null,
    ) => {
      mainStore.setSelectedTab(value as SearchTabType);
    },
    [mainStore],
  );

  const handleChangeSelectedSort = useCallback(
    (
      event: SyntheticEvent<Element, Event> | null,
      value: string | number | null,
    ) => {
      mainStore.setSelectedSort(value as SortType);
    },
    [mainStore],
  );

  useEffect(() => {
    if (inputRef) {
      if (inputRef.current) inputRef.current.value = mainStore.searchWord;
    }
  }, [inputRef]);

  return (
    <ContentWrapper>
      <section className="search-area">
        <TextField fullWidth size="small" inputRef={inputRef} />
        <IconButton onClick={handleClickSearchButton}>
          <ArrowUpward />
        </IconButton>
      </section>
      <section className="tab-area">
        <Tabs value={mainStore.selectedTab} onChange={handleChangeSelectedTab}>
          <TabList disableUnderline>
            {SEARCH_TAB_INFOS.map((info) => (
              <Tab
                key={info.value}
                value={info.value}
                variant="solid"
                disableIndicator
              >
                {info.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </section>
      <section className="top-area">
        <section className="total-area">
          <Typography display="inline">전체 검색 결과</Typography>
          <Typography display="inline">{`${(5100).toLocaleString()}건`}</Typography>
        </section>
        <section>
          <Tabs
            size="sm"
            value={mainStore.selectedSort}
            onChange={handleChangeSelectedSort}
          >
            <TabList disableUnderline>
              {SORT_TYPE_INFOS.map((info, i) => (
                <>
                  <Tab
                    key={info.value}
                    value={info.value}
                    disableIndicator
                    indicatorInset
                  >
                    {info.label}
                  </Tab>
                  {i !== SORT_TYPE_INFOS.length - 1 && (
                    <Divider orientation="vertical" variant="middle" flexItem />
                  )}
                </>
              ))}
            </TabList>
          </Tabs>
        </section>
      </section>
      <section>list</section>
      <section>pagination</section>
    </ContentWrapper>
  );
};

export default observer(Search);
