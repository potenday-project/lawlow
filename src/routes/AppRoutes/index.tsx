import React, { ReactElement } from "react";

import { Outlet } from "react-router";
import { styled } from "styled-components";

import AppBar from "./components/Appbar";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;

  .content {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
  }
`;

const AppRoutes = (): ReactElement => {
  /** @TODO Login 관련 */
  return (
    <AppContainer>
      <AppBar />
      <ContentContainer>
        <div className="content">
          <Outlet />
        </div>
      </ContentContainer>
    </AppContainer>
  );
};

export default AppRoutes;
