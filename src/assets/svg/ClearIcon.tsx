import { ReactElement } from "react";

const ClearIcon = (): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <circle cx="10.75" cy="10" r="10" fill="#999897" />
      <path
        d="M7.28772 13.7124L14.7123 6.28778"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.28772 6.2876L14.7123 13.7122"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClearIcon;
