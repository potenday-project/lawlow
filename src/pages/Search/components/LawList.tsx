import React, { ReactElement, useCallback } from "react";

import { observer } from "mobx-react-lite";

import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Pagination,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useStore } from "@/stores";

import NoResult from "./NoResult";
import useGetLawsHook from "../hooks/useGetLawsHook";

const StyledSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  .MuiListItemButton-root {
    border-bottom: 0.5px solid var(--grey-1, #999897);
    padding: 24px 15px 12px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;

    .item-container {
      display: flex;
      flex-direction: column;

      .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          width: 80vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--black-2, #3a3a3a);
          font-family: SUIT;
          font-size: 19px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }

      .content {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: var(--black-2, #3a3a3a);
        font-family: SUIT;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 19.5px */
        letter-spacing: -0.2px;
      }

      .chip-container {
        display: flex;
        gap: 4px;

        .chip {
          padding: 2px 7px;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          background: var(--grey-1, #999897);
          color: var(--white-2, #fffdfa);
          font-family: SUIT;
          font-size: 10px;
          font-style: normal;
          font-weight: 500;
          line-height: 150%; /* 15px */
        }
      }
    }
  }

  .pagination-area {
    background: #ececec;
    padding: 8px 0;
    display: flex;
    justify-content: center;
    align-items: end;
    flex: 1;

    .MuiPagination-root {
      max-height: 58px;
      width: 100%;
      display: flex;
      justify-content: center;
      background: #fff;
      padding: 13px 0px;
    }
  }
`;

interface Props {
  q: string;
}

const LawList = ({ q }: Props): ReactElement => {
  const navigate = useNavigate();
  const { mainStore } = useStore();

  const { isNoResult, laws, totalPages } = useGetLawsHook({
    q,
    type: mainStore.selectedTab,
  });

  const handleClickListItem = useCallback((id: number) => {
    navigate(`${id}`);
  }, []);

  const handleChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      mainStore.setSelectedPage(page);
    },
    [],
  );

  return (
    <StyledSection>
      {isNoResult && <NoResult />}
      {!isNoResult && (
        <>
          <List disablePadding>
            {laws.map((law) => (
              <ListItemButton
                key={law.type === "prec" ? law.사건번호 : law.기본정보.법령ID}
                onClick={() =>
                  handleClickListItem(
                    law.type === "prec"
                      ? law.판례정보일련번호
                      : law.기본정보.법령ID,
                  )
                }
              >
                <Box className="item-container">
                  <Box className="title-container">
                    <Typography className="title">
                      {law.type === "prec" ? law.사건명 : law.기본정보.법령명}
                    </Typography>
                    <IconButton>
                      <ArrowForwardIos />
                    </IconButton>
                  </Box>
                  <Box className="content">
                    {law.type === "prec"
                      ? law.판례내용.replaceAll("<br/>", " ")
                      : law.조문.조문단위
                          .map((jomoon) => jomoon.조문내용)
                          .join("\n")}
                  </Box>
                  <Box className="chip-container">
                    {law.type === "prec" ? (
                      <Box className="chip">{law.사건종류명}</Box>
                    ) : (
                      <Box className="chip">현행</Box>
                    )}
                  </Box>
                </Box>
              </ListItemButton>
            ))}
          </List>
          <Box className="pagination-area">
            <Pagination
              page={mainStore.selectedPage}
              count={totalPages}
              onChange={handleChangePage}
            />
          </Box>
        </>
      )}
    </StyledSection>
  );
};

export default observer(LawList);
