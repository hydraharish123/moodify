import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.5rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header({ name }) {
  return (
    <StyledHeader>
      <p>Hi {name}</p>
    </StyledHeader>
  );
}

export default Header;
