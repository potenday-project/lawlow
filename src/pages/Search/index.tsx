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
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import styled from "styled-components";

import { useStore } from "@/stores";
import { SEARCH_TAB_INFOS, SearchTabType } from "@interface/search";

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
      <section>top</section>
      <section>list</section>
      <section>pagination</section>
    </ContentWrapper>
  );
};

export default observer(Search);
