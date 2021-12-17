import React from "react";

import GrantFilterItem from "./GrantFilterItem";

const testData1 = [
  { id: 1, val: "Open" },
  { id: 2, val: "Opened" },
  { id: 3, val: "Closed" },
];

const testData2 = [
  { id: 1, val: "Revise and Resubmit" },
  { id: 2, val: "Revise" },
  { id: 3, val: "Resubmit" },
];

const testData3 = [
  { id: 1, val: "No Payment Due" },
  { id: 2, val: "Success" },
  { id: 3, val: "Failed" },
];

const testData4 = [
  { id: 1, val: "Grantee" },
  { id: 2, val: "Grantee1" },
  { id: 3, val: "Grantee2" },
];

const MainGrantFilters = () => {
  return (
    <div className="flex mt-3 px-3 gap-x-3.5">
      <GrantFilterItem title="Grant Status" options={testData1} />
      <GrantFilterItem title="Review Status" options={testData2} />
      <GrantFilterItem title="Payment Status" options={testData3} />
      <GrantFilterItem title="Ball in Court" options={testData4} />
      <button className="flex w-20 bg-bgBlack rounded-xl justify-center items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66602 6.6665L7.99935 9.99984L11.3327 6.6665"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10V2"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default MainGrantFilters;
