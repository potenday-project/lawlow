import { ReactElement, useCallback } from "react";

import { observer } from "mobx-react-lite";

import { useNavigate } from "react-router";
import styled from "styled-components";

import LawListPresentation from "@/pages/components/LawList";
import NoResult from "@/pages/components/NoResult";
import { useStore } from "@/stores";

import useGetLawsHook from "../hooks/useGetLawsHook";

const StyledSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface Props {
  q: string;
}

const SearchLawList = ({ q }: Props): ReactElement => {
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
        <LawListPresentation
          type={mainStore.selectedTab}
          list={laws}
          page={mainStore.selectedPage}
          count={totalPages}
          onClick={handleClickListItem}
          onChange={handleChangePage}
        />
      )}
    </StyledSection>
  );
};

export default observer(SearchLawList);
