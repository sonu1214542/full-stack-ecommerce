import React from "react";
import "./Search.css"

const Search = () => {
  return (
    <div>
      <div className="filters">
        <ul>
          <li><select name="sort by" id="">
            <option value="">sort by</option>
            <option value="">sort by</option></select></li>
          <li><select name="sort by" id="">size</select></li>
          <li><select name="sort by" id="">color</select></li>
          <li><select name="sort by" id=""></select></li>
        </ul>
      </div>
    </div>
  );
};

export default Search;
