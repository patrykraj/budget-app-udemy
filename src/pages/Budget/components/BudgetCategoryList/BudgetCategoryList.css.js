import styled from "styled-components";

export const Category = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  padding: ${({ theme }) => theme.spacing.s}px;
  display: flex;
  justfify-content: space-between;
`;

export const ParentCategory = styled(Category)`
  background-color: ${({ theme }) => theme.colors.gray.normal};
`;

export const CategoryItem = styled(Category)`
  background-color: ${({ theme }) => theme.colors.gray.light};
`;
