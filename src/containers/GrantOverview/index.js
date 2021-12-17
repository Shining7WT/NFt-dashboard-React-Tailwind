import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import MainGrantFilters from "./components/MainGrantFilters";

const GrantOverview = () => {
  return (
    <>
      <div>
        <MainGrantFilters />
      </div>
    </>
  );
};

export default GrantOverview;
