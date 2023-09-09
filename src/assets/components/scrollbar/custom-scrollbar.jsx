import React from "react";

const CustomScrollbar = ({ children }) => {
  return (
    <div className="custom-scrollbar-container">
      <div className="custom-scrollbar-content">{children}</div>
    </div>
  );
};

export default CustomScrollbar;
