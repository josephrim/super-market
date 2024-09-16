import React, { useState } from "react";
import styled from "styled-components";

import Menu from "./Menu";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.sizes.large};
  font-weight: bold;

  img {
    height: 50px;
    margin-right: 1rem;
  }
`;

const DesktopNav = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileNavButton = styled.button`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    background: none;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100vh; /* Full height */
  z-index: 999;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease-in-out;

  a {
    margin-bottom: 1rem;
    color: white;
    text-decoration: none;
    font-size: ${({ theme }) => theme.sizes.large};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <Logo>
        <img src="/assets/img/logo.png" alt="Supermarket Logo" />
        Supermarket
      </Logo>
      <DesktopNav>
        <Menu />
      </DesktopNav>
      <MobileNavButton onClick={toggleMobileMenu}>☰</MobileNavButton>
      {isMobileMenuOpen && (
        <MobileMenu>
          <Menu onLinkClick={toggleMobileMenu} />
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
