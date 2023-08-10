import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

import { DETAIL_TAB_INFOS } from "@/interface/searchDetail";
import TitleSvg from "@assets/svg/TitleSvg";

const ContentWrapper = styled.main`
  position: absolute;
  top: 56px;
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;

  .original-area {
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

    .sub-title-area {
      margin: 5px 20px;
      padding: 13px;
      display: inline-flex;
      justify-content: center;
      border-radius: 20px;
      background: #f5f5f5;
      color: #000;
      text-align: center;
      font-family: Pretendard;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 15px;
    }

    .original-data-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px 20px;

      .tab-container {
        width: 100%;
      }

      .tab-panel {
        width: 100%;
        min-height: 143px;
        max-height: 143px;
      }
    }
  }

  .lawlow-data-area {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #fbfaff;

    .title-container {
      display: inline-flex;
      align-items: center;
      padding: 15px 20px;
      .title {
        color: #000;
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 15px; /* 83.333% */
      }
    }

    .content-container {
      min-height: 240px;
      padding: 0px 20px;
      overflow: hidden;
      color: #000;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 137.5% */
      letter-spacing: 0.2px;
    }

    .keyword-container {
      flex: 1;
      padding: 0px 20px;
      .keyword-title {
        position: relative;
        top: 13px;
        left: 10px;
        display: inline-flex;
        padding: 0px 10px;
        border-radius: 12px;
        background: #3a00e5;
        color: #fff;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
        letter-spacing: 0.2px;
      }
      .keyword-container {
        height: 53px;
        border-radius: 20px;
        background: #fff;
        display: inline-flex;
        gap: 3px;
        width: 100%;
        align-items: center;

        .keyword {
          color: #000;
          font-family: Pretendard;
          font-size: 13px;
          font-style: normal;
          font-weight: 500;
          line-height: 16.5px; /* 126.923% */
          letter-spacing: 0.2px;
        }
      }
    }

    .button-container {
      display: flex;
      justify-content: center;
      padding: 24px 20px;
      gap: 27px;
      .button {
        padding: 12px 36px;
        border-radius: 20px;
        background: #3a00e5;
        color: #fff;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16.5px; /* 117.857% */
        letter-spacing: 0.2px;
      }
    }
  }
`;

const TabPanel = ({
  selectedValue,
  value,
}: {
  selectedValue: string;
  value: string;
}): ReactElement => {
  return (
    <div className="tab-panel" role="tabpanel" hidden={value !== selectedValue}>
      {value === selectedValue && <Box sx={{ p: 3 }}>{value}</Box>}
    </div>
  );
};

const SearchDetail = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  /** @TODO 1. data1 호출 */
  /** @TODO 2. data2 호출 */

  const [selectedTab, setSelectedTab] = useState("original");

  const handleClickGoBack = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  const handleChangeTabs = useCallback(
    (event: SyntheticEvent<Element, Event> | null, value: string) => {
      setSelectedTab(value);
    },
    [setSelectedTab],
  );

  console.log(id);
  return (
    <ContentWrapper>
      {/* @TODO api 나오면 컴포넌트 분리 */}
      <Box className="original-area">
        <Box className="title-area">
          <IconButton onClick={handleClickGoBack}>
            <ArrowBack />
          </IconButton>
          <p>title</p>
        </Box>
        <Box className="sub-title-area">sub-title-area</Box>
        <Box className="original-data-area">
          <Box className="tab-container">
            <Tabs
              value={selectedTab}
              onChange={handleChangeTabs}
              variant="fullWidth"
            >
              {DETAIL_TAB_INFOS.map((info) => (
                <Tab label={info.label} value={info.value} />
              ))}
            </Tabs>
          </Box>
          {DETAIL_TAB_INFOS.map((info) => (
            <TabPanel selectedValue={selectedTab} value={info.value} />
          ))}
        </Box>
      </Box>

      {/* @TODO api 나오면 컴포넌트 분리 */}
      <Box className="lawlow-data-area">
        <Box className="title-container">
          <TitleSvg />
          <Typography className="title">로우로우 판례</Typography>
        </Box>
        <Box className="content-container">
          원고와 피고들 사이에 불법 다단계판매업에 관한 분쟁이 있었습니다.
          원고는 피고들이 자신과 계약을 위반하고 불법 행위를 한 것으로 주장하며
          손해배상을 청구했습니다. 하지만 판사는 피고들이 원고의 활동법규를 어긴
          것이 아니라, 다른 다단계판매업을 하는 회사로 옮겨 활동하거나 원고
          소속의 다른 다단계판매원들에게 이직을 권유한 것이 법적으로 문제가 되지
          않는다고 판단했습니다. 따라서 원고의 청구를 모두 기각하고, 소송비용은
          원고가 부담하도록 결정되었습니다.
        </Box>
        <Box className="keyword-container">
          <Box className="keyword-title">키워드</Box>
          <Box className="keyword-container">
            {["다단계판매업", "방문판매업", "불법 다단계판매", "폰지사기"].map(
              (k) => (
                <Typography className="keyword" display="inline">
                  {`#${k}`}
                </Typography>
              ),
            )}
          </Box>
        </Box>
        <Box className="button-container">
          <Button className="button">더 쉬운 로우로우</Button>
          <Button className="button">저장</Button>
        </Box>
      </Box>
    </ContentWrapper>
  );
};

export default SearchDetail;
