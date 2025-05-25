import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.5rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

function Header({ name, image }) {
  return (
    <StyledHeader>
      <img src={image} height={30} width={30} className="rounded-md" />
      <p>
        Hi <strong>{name}</strong> !!
      </p>
    </StyledHeader>
  );
}

export default Header;
