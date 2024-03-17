import React, { useEffect, useState } from "react";
import "./A.css";
import {useLocation}  from "react-router-dom"
import ProductCard from "./ProductCard/ProductCard";
import {
  useSearchProductsQuery,
  useCategoriesQuery,
} from "./Redux/Api/ProductApi";
import A from "./A";


const Home = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("");

  const { data, error, isLoading } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
  });

   useEffect(() => {
    const scrollpos = localStorage.getItem('scrollpos');
    setTimeout(() => {
      if (scrollpos) window.scrollTo(0, parseInt(scrollpos));
    }, 1000);
  }, []); // This effect runs only once on component mount

  useEffect(() => {
    window.scrollTo(0,0);
    console.log("scrolled")
  }, [page])
  

  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem('scrollpos', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // This effect runs only once on component mount


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: "flex", margin: "0.3vw", flexDirection: "row" }}>
      <div
        style={{
          position: "fixed", // Making it fixed
          marginRight: "0.1vw",
          marginLeft: "0.5vw",
          marginTop:"7vw",
          display: "flex",
          height: "fit-content", 
          alignContent: "center",
        }}
      >
        <A
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          category={category}
          setCategory={setCategory}
          page={page}
          setPage={setPage}
        />
      </div>
      <div style={{ marginLeft:"200px", display: "flex", flexWrap: "wrap", flexDirection: "row", marginTop:"6vw"}}>
        {data?.products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
