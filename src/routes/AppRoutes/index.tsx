import React, { ReactElement } from "react";

import { Outlet } from "react-router";
import { styled } from "styled-components";

import AppBar from "./components/Appbar";

const AppContainer = styled.div`
  height: 100%;
  width: 390px;
  max-width: 390px;
  min-width: 390px;
  display: flex;
  flex-direction: column;
  border-radius: 49px;
  overflow: hidden;

  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 5px 6px -3px,
    rgba(0, 0, 0, 0.14) 0px 5px 8px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 14px 0px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;

  .content {
    height: 100%;
    width: 390px;

    display: flex;
    flex-direction: column;
  }
`;

const AppRoutes = (): ReactElement => {
  /** @TODO Login 관련 */
  return (
    <AppContainer id="test">
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
