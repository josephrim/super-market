import React from "react";
import styled from "styled-components";

import Layout from "../layouts/Layout";

const SuccessMessage = styled.div`
  text-align: center;
  padding: 4rem;

  h1 {
    font-size: ${({ theme }) => theme.sizes.large};
    color: ${({ theme }) => theme.colors.success};
  }

  p {
    font-size: ${({ theme }) => theme.sizes.medium};
    margin-top: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: bold;
  }
`;

const SuccessPage = () => {
  return (
    <Layout>
      <SuccessMessage>
        <h1>Thank you for your purchase!</h1>
        <p>Your order has been successfully processed.</p>
        <p>
          <a href="/">Return to Home</a>
        </p>
      </SuccessMessage>
    </Layout>
  );
};

export default SuccessPage;
