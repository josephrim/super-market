import React from "react";

import Layout from "../layouts/Layout";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <Layout>
      <h1>Welcome to Our Supermarket</h1>
      <ProductList />
    </Layout>
  );
};

export default HomePage;
