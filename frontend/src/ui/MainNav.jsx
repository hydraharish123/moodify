import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineCog6Tooth, HiOutlineHome } from "react-icons/hi2";
import { MdFavoriteBorder } from "react-icons/md";
import { TbCapture } from "react-icons/tb";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const spotify_id = searchParams.get("spotify_id");

  const appendSpotifyId = (path) =>
    spotify_id ? `${path}?spotify_id=${spotify_id}` : path;

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to={appendSpotifyId("/dashboard")}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={appendSpotifyId("/recommend")}>
            <TbCapture />
            <span>Recommend</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={appendSpotifyId("/favorites")}>
            <MdFavoriteBorder />
            <span>Favorites</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={appendSpotifyId("/settings")}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
