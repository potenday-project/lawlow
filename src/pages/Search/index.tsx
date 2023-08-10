import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { observer } from "mobx-react-lite";

import { ArrowBack, ArrowForwardIos } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  TextField,
  TextFieldProps,
  Typography,
  Tabs,
  Tab,
  Paper,
  Box,
  Chip,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

import SearchIcon from "@/assets/svg/SearchIcon";
import { useStore } from "@/stores";
import {
  BriefSearchResult,
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
    }

    .goback-button {

    }
    .search-button {
        background-color: rgba(255, 188, 16, 1);
        color: #ffffff;
        box-shadow: 2px 2px 4px 0px rgba(255, 126, 32, 0.25);
      }
  }

  .tab-area {
    padding: 1.5rem 1rem 0rem 1rem;

    .MuiTabs-root {
      background-color: #eae3fe;
      border-radius: 33px;
      display: inline-flex;
      padding: 5px 10px;
      width: 100%;

      .MuiTabs-indicator {
        display: none;
      }

      .MuiTab-root {
        flex: 1;
        background-color: transparent;
        color: #000;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 11px; /* 68.75% */

        &.Mui-selected {
          background-color: #3a00e5;
          border-radius: 33px;
          color: #fff;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
      }
    }
  }

  .top-area {
    display: inline-flex;
    padding: 11px 1rem;
    justify-content: space-between;
    align-items: baseline;

    .total-area {
      display: inline-flex;
      gap: 0.5rem;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 15px; /* 107.143% */
    }

    .MuiTabs-root {
      background-color: transparent;
      border-radius: 33px;

      .MuiTabs-indicator {
        display: none;
      }

      .MuiTab-root {
        flex: 1;
        border-radius: 33px;
        background-color: transparent;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 15px; /* 68.75% */

        &.Mui-selected {
          font-weight: 700;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
      }
    }
  }

  .list-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 11px 1rem;
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
        whitespace: nowrap;
        font-size: 12px;
        font-weight: 500;
      }

      .keywords {
        display: inline-flex;
        gap: 8px;
      }
    }
  }

  .pagination-area {
    display: inline-flex;
    justify-content: center;
    padding: 20px;
  }
`;

const Search = (): ReactElement => {
  const { mainStore } = useStore();
  const inputRef = useRef<TextFieldProps | null>(null);
  const navigate = useNavigate();

  const handleClickSearchButton = useCallback(() => {
    mainStore.addSearchWord(inputRef.current?.value as string);
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

  const handleClickListItem = useCallback((id: number) => {
    navigate(`${id}`);
  }, []);

  useEffect(() => {
    if (inputRef) {
      if (inputRef.current)
        inputRef.current.value =
          mainStore.searchWords[mainStore.searchWords.length - 1];
    }
  }, [inputRef]);

  /** @TODO list GET api */
  const data: BriefSearchResult[] = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    title: "가품 판매 업체 대표에 대한 명예훼손 사례",
    content:
      "1. 2019년, 한 온라인 커뮤니티 사용자가 가품 판매 업체 대표를 고발하는 글을 올렸습니다. 가품 업체 대표가 이를 명예훼손으로 간주하고 해당 사용자를 상대로 소송을 제기했습니다. 이 사안에서는 민사 소송에서 명예훼손을 입증하기 위해서는 다음과 같은 요소들을 증명해야 했습니다: 고소당사자에 의해 주장된 내용이 사실과 다르거나 오인될 정도로 음해적일 것 명예훼손이 공공의 이익을 달성하는 데 필요하다고 인정되지 않을 것",
    keywords: ["1심 취소, 원고 승", "keyword2"],
  }));

  return (
    <ContentWrapper>
      <section className="search-area">
        <IconButton className="goback-button" onClick={handleClickSearchButton}>
          <ArrowBack />
        </IconButton>
        <TextField fullWidth size="small" inputRef={inputRef} />
        <IconButton className="search-button" onClick={handleClickSearchButton}>
          <SearchIcon />
        </IconButton>
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
      <section className="top-area">
        <section className="total-area">
          <Typography display="inline">전체 검색 결과</Typography>
          <Typography display="inline">{`${(5100).toLocaleString()}건`}</Typography>
        </section>
        <section>
          <Tabs
            value={mainStore.selectedSort}
            onChange={handleChangeSelectedSort}
          >
            <Tab
              value={SORT_TYPE_INFOS[0].value}
              label={SORT_TYPE_INFOS[0].label}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Tab
              value={SORT_TYPE_INFOS[1].value}
              label={SORT_TYPE_INFOS[1].label}
            />
          </Tabs>
        </section>
      </section>
      <section className="list-area">
        {data.map((d) => (
          <Paper key={d.id} onClick={() => handleClickListItem(d.id)}>
            <Box className="title-area">
              <Typography>{d.title}</Typography>
              <IconButton>
                <ArrowForwardIos />
              </IconButton>
            </Box>
            <Box className="content">{d.content}</Box>
            <Box className="keywords">
              {d.keywords.map((k) => (
                <Chip key={k} label={k} />
              ))}
            </Box>
          </Paper>
        ))}
      </section>
      <section className="pagination-area">
        {/* @TODO Logig 구현 */}
        <Pagination count={6} size="small" />
      </section>
    </ContentWrapper>
  );
};

export default observer(Search);
