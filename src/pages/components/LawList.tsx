import React from "react";

import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Pagination,
  Typography,
  styled as muiStyled,
} from "@mui/material";

import { GetLawsResponseType, SearchTabType } from "@/interface/search";

const StyledList = muiStyled(List)({
  "& .MuiListItemButton-root": {
    borderBottom: "0.5px solid var(--grey-1, #999897)",
    padding: "24px 15px 12px 15px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "4px",

    "& .item-container": {
      width: "100%",
      display: "flex",
      flexDirection: "column",

      "& .title-container": {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .title": {
          width: "80vw",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "var(--black-2, #3a3a3a)",
          fontFamily: "SUIT",
          fontSize: "19px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
        },
      },

      "& .content": {
        width: "100%",
        display: "-webkit-box",
        "-webkit-line-clamp": "3",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        color: "var(--black-2, #3a3a3a)",
        fontFamily: "SUIT",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "150%" /* 19.5px */,
        letterSpacing: "-0.2px",
      },

      "& .chip-container": {
        display: "flex",
        gap: "4px",

        "& .chip": {
          padding: "2px 7px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px",
          background: "var(--grey-1, #999897)",
          color: "var(--white-2, #fffdfa)",
          fontFamily: "SUIT",
          fontSize: "10px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "150%" /* 15px */,
        },
      },
    },
  },
});

const StyledPagination = muiStyled(Box)({
  background: "#ececec",
  padding: "8px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  flex: 1,

  "& .MuiPagination-root": {
    maxHeight: "58px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    background: "#fff",
    padding: "13px 0px",
  },
});

const LawListPresentation = ({
  type,
  list,
  page,
  count,
  onClick,
  onChange,
}: {
  type: SearchTabType;
  list: GetLawsResponseType<typeof type>[];
  page: number;
  count: number;
  onClick: (id: number) => void;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}) => {
  return (
    <>
      <StyledList disablePadding>
        {list.map((law) => (
          <ListItemButton
            key={law.type === "prec" ? law.사건번호 : law.기본정보.법령ID}
            onClick={() =>
              onClick(
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
                  ? law?.판례내용.replaceAll("<br/>", " ")
                  : law?.조문?.조문단위
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
      </StyledList>
      <StyledPagination>
        <Pagination page={page} count={count} onChange={onChange} />
      </StyledPagination>
    </>
  );
};

export default LawListPresentation;
