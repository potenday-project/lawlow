import { ReactElement, useEffect } from "react";

import { Box } from "@mui/material";
import styled from "styled-components";

import useGetLawDetail from "@/api/getLawDetail";
import { SearchTabType } from "@/interface/search";
import { DetailTabType } from "@/interface/searchDetail";

const StyledTabPanel = styled.div`
  flex: 1;
  width: 100%;
  flex-direction: column;
  padding: 28px 0px;
  gap: 42px;

  .title-container {
    display: flex;
    width: 100%;
    justify-content: center;
    .title {
      min-height: 23px;
      background-image: linear-gradient(
        to bottom,
        transparent 50%,
        #fff27a 50%
      );
      color: var(--black, #1b1b1b);
      font-family: SUIT;
      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }

  .content {
    width: 100%;
    color: var(--black, #1b1b1b);
    font-family: SUIT;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 170%; /* 28.9px */
    letter-spacing: -0.2px;
  }
`;

const TabPanel = ({
  selectedSearchTab,
  selectedValue,
  value,
  id,
  setTitle,
}: {
  selectedSearchTab: SearchTabType;
  selectedValue: string;
  value: DetailTabType<typeof selectedSearchTab>;
  id: number | string;
  setTitle: (title: string) => void;
}): ReactElement => {
  const { data } = useGetLawDetail({
    type: selectedSearchTab,
    id,
  });

  useEffect(() => {
    if (data) {
      if (data.type === "prec") {
        setTitle(`${data.lawInfo.사건번호} 판결`);
      } else {
        setTitle(data.lawInfo.기본정보.법령명);
      }
    }
  }, [data]);

  useEffect(() => {
    const el = document.getElementById("law-title");
    if (el && el.clientHeight > 23) {
      el.style.background = "#fff27a";
    }
  }, []);

  return (
    <StyledTabPanel
      role="tabpanel"
      style={{ display: value !== selectedValue ? "none" : "flex" }}
    >
      {data?.type === "prec" && (
        <>
          <Box className="title-container">
            <Box id="law-title" className="title">
              {data.lawInfo.사건명}
            </Box>
          </Box>
          <Box
            className="content"
            dangerouslySetInnerHTML={{ __html: data.lawInfo.판례내용 }}
          />
        </>
      )}
      {data?.type === "statute" && (
        <>
          <Box className="title-container">
            <Box id="law-title" className="title">{`현행 법령[시행 ${(() => {
              const str = data.lawInfo.기본정보.시행일자.toString();
              const year = str.slice(0, 4);
              const month = str.slice(4, 6);
              const day = str.slice(6, 8);

              return `${year}.${month}.${day}`;
            })()}]`}</Box>
          </Box>

          <Box
            className="content"
            dangerouslySetInnerHTML={{
              __html: data.lawInfo.부칙.부칙단위
                .map((b) => b.부칙내용.join("<br/>").replaceAll("\n", "<br/>"))
                .join("<br/>"),
            }}
          />
        </>
      )}
    </StyledTabPanel>
  );
};

export default TabPanel;
