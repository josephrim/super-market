import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  addToBasket,
  clearBasket,
  removeFromBasket,
} from "../store/slices/basketSlice";

const BasketContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const BasketList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BasketItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

const ItemName = styled.p`
  font-size: ${({ theme }) => theme.sizes.medium};
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > button {
    padding: 0.3rem 0.7rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.sizes.small};
  }
`;

const ItemPrice = styled.p`
  font-size: ${({ theme }) => theme.sizes.medium};
`;

const TotalPrice = styled.h3`
  margin-top: 2rem;
  font-size: ${({ theme }) => theme.sizes.large};
`;

const CheckoutButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Basket = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items);
  const navigate = useNavigate(); // Use React Router's navigate hook

  const handleIncreaseQuantity = (product) => {
    dispatch(addToBasket(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(removeFromBasket(product));
  };

  const handleCheckout = () => {
    // Redirect to success page after clicking "Proceed to Checkout"
    dispatch(clearBasket());
    navigate("/success");
  };

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <BasketContainer>
      <h2>Your Basket</h2>
      <BasketList>
        {basket.map((item, index) => (
          <BasketItem key={index}>
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
            </ItemInfo>
            <Row>
              <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              <ItemQuantity>
                <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              </ItemQuantity>
            </Row>
          </BasketItem>
        ))}
      </BasketList>
      <TotalPrice>Total: ${total.toFixed(2)}</TotalPrice>
      <CheckoutButton onClick={handleCheckout}>
        Proceed to Checkout
      </CheckoutButton>
    </BasketContainer>
  );
};

export default Basket;
