import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: ${({ theme }) => theme.sizes.medium};
  padding: 1rem 1rem;
  width: 100%;
  border-radius; 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

const Menu = ({ onLinkClick }) => {
  return (
    <Nav>
      <NavLink to="/" onClick={onLinkClick}>
        Home
      </NavLink>
      <NavLink to="/basket" onClick={onLinkClick}>
        Basket
      </NavLink>
    </Nav>
  );
};

export default Menu;
