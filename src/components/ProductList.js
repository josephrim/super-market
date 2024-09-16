import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ProductCardContainer } from "./ProductCard";

import { addToBasket } from "../store/slices/basketSlice";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    padding: 1rem;
  }
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);

  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCardContainer key={product.id}>
          <div>
            <h3 onClick={() => navigate(`/product/${product.id}`)}>
              {product.name}
            </h3>
            <p>${product.price}</p>
          </div>
          <button onClick={() => dispatch(addToBasket(product))}>
            Add to Basket
          </button>
        </ProductCardContainer>
      ))}
    </ProductGrid>
  );
};

export default ProductList;
