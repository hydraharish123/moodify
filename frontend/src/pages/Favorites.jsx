import styled from "styled-components";
import Heading from "../ui/Heading";
import FavoritesDescription from "../features/Favorites/FavoritesDescription";
import FavoritesTable from "../features/Favorites/FavoritesTable";

const StyledFavoritesDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

function Favorites() {
  return (
    <StyledFavoritesDiv>
      <Heading as="h1">Your Favorites</Heading>
      <FavoritesDescription />
      <FavoritesTable />
    </StyledFavoritesDiv>
  );
}

export default Favorites;
