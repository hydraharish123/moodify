import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.5rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

function Header({ name, img_obj }) {
  return (
    <StyledHeader>
      <img src={img_obj?.url} width={30} height={30} className="rounded-3xl" />
      <p>
        Hi <strong>{name}</strong> !!
      </p>
    </StyledHeader>
  );
}

export default Header;
