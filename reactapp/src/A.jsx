import React, { useState, useEffect } from "react";
import "./A.css";
import { useCategoriesQuery } from "./Redux/Api/ProductApi";
import { Link } from "react-router-dom";

function List({ buttonText, listItems, className, onItemClick }) {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList((prev) => !prev);
  };

  return (
    <>
      <span onClick={toggleList} className="span">
        {showList ? `Hide ${buttonText} ` : `Show ${buttonText}`}
      </span>
      {showList && (
        <ul className={className}>
          {listItems.map((item, index) => (
            <li key={index}>
              <span>
                <a
                  href=""
                  style={{ textDecoration: "none" }}
                  onClick={(e) => onItemClick(e, buttonText, item)}
                >
                  {item}
                </a>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function A({ search, setSearch, sort, setSort, category, setCategory,page,setPage }) {
  const { data: categoriesResponse } = useCategoriesQuery("");
  console.log(categoriesResponse && categoriesResponse.message
    ? categoriesResponse.message
    : []);

  const handleItemClick = (e, buttonText, item) => {
    e.preventDefault();
    switch (buttonText) {
      case "Category":
        setCategory(item);
        console.log("Category selected:", item);
        break;
      case "Sort By":
        setSort(item);
        console.log("Sort by selected:", item);
        break;
        case "All Categories":
        setCategory("");
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0.01vw",
        width: "max-content",
        justifyContent: "center",
      }}
      className="list"
    >
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search products...." style={{borderRadius:"10px"}}></input>
      <input value={page} onChange={(e)=>setPage(e.target.value)} placeholder="page" style={{borderRadius:"10px"}}></input>
      <List
        buttonText="Category"
        listItems={
          categoriesResponse && categoriesResponse.message
            ? categoriesResponse.message
            : []
        }
        className={"listitems"}
        onItemClick={handleItemClick}
      />
      <List
        buttonText="Gender"
        listItems={["Item 1", "Item 2", "Item 3"]}
        className={"listitems"}
        onItemClick={handleItemClick}
      />
      <List
        buttonText="Color"
        listItems={["Item 1", "Item 2", "Item 3"]}
        className={"listitems"}
        onItemClick={handleItemClick}
      />
      <List
        buttonText={"Sort By"}
        listItems={["asc", "dsc"]}
        className={"listitems"}
        onItemClick={handleItemClick}
      />
      <List
        buttonText={"Size"}
        listItems={["S", "M", "L", "XL"]}
        className={"listitems"}
        onItemClick={handleItemClick}
      />
      <List
        buttonText={"All Categories"}
        listItems={["All Categories"]}
        className={"listitems"}
        onItemClick={handleItemClick}
      />
    </div>
  );
}

export default A;
