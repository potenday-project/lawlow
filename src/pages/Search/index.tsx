import React, { ReactElement, useCallback, useEffect, useRef } from "react";

import { ArrowUpward } from "@mui/icons-material";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import styled from "styled-components";

import { useStore } from "@/stores";

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
`;

const Search = (): ReactElement => {
  const { mainStore } = useStore();
  const inputRef = useRef<TextFieldProps | null>(null);

  /** @TODO list GET api */

  const handleClickSearchButton = useCallback(() => {
    mainStore.setSearchWord(inputRef.current?.value as string);
  }, []);

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
      <section>tab</section>
      <section>top</section>
      <section>list</section>
      <section>pagination</section>
    </ContentWrapper>
  );
};

export default Search;
