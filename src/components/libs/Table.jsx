import React from "react";

function Table({ children }) {
  return (
    <table className="w-full table-auto border-collapse">{children}</table>
  );
}

export default Table;
