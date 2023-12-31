import {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";

import { observer } from "mobx-react-lite";

import { Box, Button } from "@mui/material";
import styled from "styled-components";

import useDeleteStoredLaw from "@/api/deleteStoredLaw";
import useGetAiDetail from "@/api/getAiDetail";
import useStoreLaws from "@/api/putStoredLaws";
import MoreEasyIcon from "@/assets/svg/MoreEasyIcon";
import SavedIcon from "@/assets/svg/SavedIcon";
import SaveIcon from "@/assets/svg/SaveIcon";
import { SearchTabType } from "@/interface/search";
import { DetailTabType } from "@/interface/searchDetail";
import Fallback from "@/pages/components/Fallback";
import { useStore } from "@/stores";

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

  .keyword-container {
    .title {
      display: inline-flex;
      padding: 7px 12px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 51px;
      border: 1px solid var(--deep-orange, #ff7e20);
      color: var(--black, #1b1b1b);
      font-family: SUIT;
      font-size: 17px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 9px;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      .keyword {
        color: var(--black, #1b1b1b);
        font-family: SUIT;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;

    .more-easy-button {
      padding: 12px 25px;
      border-radius: 14px;
      background: var(--yellow-2, #fdf3de);
      color: var(--black-2, #3a3a3a);
      font-family: SUIT;
      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .save-button {
      padding: 12px 25px;
      border-radius: 14px;
      background: var(--orange, #ffbc10);
      color: var(--white-1, #fff);
      font-family: SUIT;
      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .saved-button {
      padding: 12px 25px;
      border-radius: 14px;
      background: var(--orange, #ff7e20);
      color: var(--white-1, #fff);
      font-family: SUIT;
      font-size: 19px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
`;

const Content = ({
  id,
  type,
  content,
  enabled,
  setEnabledFalse,
}: {
  id: number | string;
  type: SearchTabType;
  content: string;
  enabled: boolean;
  setEnabledFalse: () => void;
}): ReactElement => {
  const [text, setText] = useState(content.replaceAll("/n", "<br/>"));
  const { data } = useGetAiDetail({
    id,
    type,
    recentSummaryMsg: content,
    enabled,
    setEnabledFalse,
  });

  useEffect(() => {
    if (data) {
      setText(data.summary.replaceAll("/n", "<br/>"));
    }
  }, [data]);

  return <Box className="content" dangerouslySetInnerHTML={{ __html: text }} />;
};

const AiTabPanel = ({
  selectedSearchTab,
  selectedValue,
  value,
  id,
}: {
  selectedSearchTab: SearchTabType;
  selectedValue: string;
  value: DetailTabType<typeof selectedSearchTab>;
  id: string | number;
}): ReactElement => {
  const { mainStore } = useStore();
  const { data } = useGetAiDetail({
    type: selectedSearchTab,
    id,
  });

  const [enabled, setEnabled] = useState(false);
  const setEnabledFalse = useCallback(() => setEnabled(false), []);

  const [saved, setSaved] = useState(mainStore.isSaved);

  const { mutate } = useStoreLaws();
  const { mutate: deleteMutate } = useDeleteStoredLaw();

  const handleClickMoreEasy = useCallback(() => {
    setEnabled(true);
  }, []);

  const handleClickSave = useCallback(() => {
    mutate(
      {
        type: selectedSearchTab,
        id,
      },
      {
        onSuccess: () => {
          setSaved(true);
          mainStore.setIsSaved(true);
        },
      },
    );
  }, []);

  const handleClickDelete = useCallback(() => {
    deleteMutate(
      {
        type: selectedSearchTab,
        id,
      },
      {
        onSuccess: () => {
          setSaved(false);
          mainStore.setIsSaved(false);
        },
      },
    );
  }, []);

  useEffect(() => {
    const el = document.getElementById("easy-title");
    if (el && el.clientHeight > 23) {
      el.style.background = "#fff27a";
    }
  }, []);

  return (
    <StyledTabPanel
      role="tabpanel"
      style={{ display: value !== selectedValue ? "none" : "flex" }}
    >
      <Box className="title-container">
        <Box id="easy-title" className="title">
          {data?.easyTitle}
        </Box>
      </Box>
      <Suspense fallback={<Fallback text="더 쉽게 번역 중" />}>
        <Content
          id={id}
          type={selectedSearchTab}
          content={data?.summary ?? ""}
          enabled={enabled}
          setEnabledFalse={setEnabledFalse}
        />
      </Suspense>
      <Box className="keyword-container">
        <Box className="title">Keyword</Box>
        <Box className="container">
          {data?.keywords?.map((keyword: string) => (
            <Box className="keyword">{`#${keyword}`}</Box>
          ))}
        </Box>
      </Box>
      <Box className="button-container">
        <Button
          startIcon={<MoreEasyIcon />}
          className="more-easy-button"
          onClick={handleClickMoreEasy}
        >
          더 쉽게 해석
        </Button>
        {!saved && (
          <Button
            startIcon={<SaveIcon />}
            className="save-button"
            onClick={handleClickSave}
          >
            판례 저장
          </Button>
        )}
        {saved && (
          <Button
            startIcon={<SavedIcon />}
            className="saved-button"
            onClick={handleClickDelete}
          >
            저장된 판례
          </Button>
        )}
      </Box>
    </StyledTabPanel>
  );
};

export default observer(AiTabPanel);
