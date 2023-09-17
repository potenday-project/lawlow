import { ReactElement, useCallback, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";

import { Box } from "@mui/material";
import { useNavigate } from "react-router";

import useGetStoredLaws from "@/api/getStoredLaws";
import { PROFILE_TAB_INFOS } from "@/interface/profile";
import { SearchTabType } from "@/interface/search";
import LawListPresentation from "@/pages/components/LawList";
import { useStore } from "@/stores";

const ProfileLawList = observer(
  ({ type }: { type: SearchTabType }): ReactElement => {
    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { mainStore } = useStore();

    const { data } = useGetStoredLaws({
      type,
      page,
      take: 5,
    });

    const handleChangePage = useCallback(
      (event: React.ChangeEvent<unknown>, num: number) => {
        setPage(num);
      },
      [],
    );

    const handleClickListItem = useCallback(
      (id: number) => {
        // eslint-disable-next-line no-promise-executor-return
        new Promise((res) => res(mainStore.setSelectedTab(type))).then(() =>
          navigate(`/search/${id}`),
        );
      },
      [type],
    );

    useEffect(() => {
      if (data) {
        setPages(data.totalPages);
      }
    }, [data]);

    return (
      <Box className="list-area">
        {data?.list.length === 0 && (
          <Box className="no-data">
            {`${
              PROFILE_TAB_INFOS.find((x) => x.value === type)?.label ??
              "저장한 내용"
            }${type === "prec" ? "가" : "이"} 없어요`}
          </Box>
        )}
        {(data?.list.length ?? 0) > 0 && (
          <LawListPresentation
            type={type}
            list={data?.list ?? []}
            page={page}
            count={pages}
            onClick={handleClickListItem}
            onChange={handleChangePage}
          />
        )}
      </Box>
    );
  },
);

export default ProfileLawList;
