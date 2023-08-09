import React, { ReactElement } from "react";

import { useParams } from "react-router";

const SearchDetail = (): ReactElement => {
  const { id } = useParams();

  console.log(id);
  return <div>test</div>;
};

export default SearchDetail;
