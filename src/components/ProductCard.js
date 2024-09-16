import styled from "styled-components";

export const ProductCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: ${({ theme }) => theme.sizes.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
    cursor: pointer;
  }

  p {
    font-size: ${({ theme }) => theme.sizes.small};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  button {
    padding: 0.6rem 1.2rem;
    background-color: ${({ theme }) => theme.colors.accent};
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: ${({ theme }) => theme.sizes.small};

    &:hover {
      background-color: #059669; /* Darker shade of green */
    }
  }
`;
