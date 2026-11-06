import { Outlet } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  const [searchData, setSearchData] = useState({
    results: [],
    query: "",
  });
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Nav setSearchData={setSearchData} setLoading={setLoading} />
      <Outlet context={{ searchData, loading }} />
      <Footer />
    </>
  );
};

export default Layout;
