import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { addToBasket } from "../store/slices/basketSlice";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ProductImage = styled.img`
  max-width: 300px;
  height: auto;
  margin-bottom: 2rem;
`;

const ProductName = styled.h2`
  font-size: ${({ theme }) => theme.sizes.large};
  margin-bottom: 1rem;
`;

const ProductPrice = styled.p`
  font-size: ${({ theme }) => theme.sizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`;

const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.sizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const AddButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => p.id === parseInt(id));

  return product ? (
    <DetailContainer>
      <ProductImage src="https://via.placeholder.com/300" alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>${product.price}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
      <AddButton onClick={() => dispatch(addToBasket(product))}>
        Add to Basket
      </AddButton>
    </DetailContainer>
  ) : (
    <p>Product not found</p>
  );
};

export default ProductDetail;
