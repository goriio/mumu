import styled from 'styled-components';
import { BiHomeAlt, BiListUl, BiSearch, BiUser } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const StyledNavBar = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: var(--nav-height);
  padding: 0 1rem;
  background: var(--color-bg);
  box-shadow: var(--box-shadow);
  z-index: calc(var(--z-index-header) + 1);

  @media screen and (min-width: 768px) {
    padding: 0 3rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const NavContainer = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: var(--nav-height);
  padding: 0 1rem;
  background: var(--color-bg);
  box-shadow: var(--box-shadow);
  font-size: 1.5rem;
  z-index: var(--z-index-header);

  @media screen and (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: unset;
    bottom: unset;
    right: unset;
    top: var(--nav-height);
    height: 100%;
    width: var(--nav-lg-screen-width);
    padding: 1rem 3rem;
    background: var(--color-bg);
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  color: var(--color-text);
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--color-primary);
  }

  &.active {
    color: var(--color-primary);
  }

  @media screen and (min-width: 768px) {
    margin: 0.5rem 0;
    gap: 1rem;
  }
`;

const NavLabel = styled.span`
  display: none;
  font-size: 1rem;
  font-weight: 600;

  @media screen and (min-width: 768px) {
    display: inline-block;
  }
`;

export function NavBar() {
  return (
    <>
      <StyledNavBar>
        <Title>mumu</Title>
      </StyledNavBar>
      <NavContainer>
        <NavItem to='/'>
          <BiHomeAlt />
          <NavLabel>Home</NavLabel>
        </NavItem>
        <NavItem to='/search'>
          <BiSearch />
          <NavLabel>Search</NavLabel>
        </NavItem>
        <NavItem to='/playlist'>
          <BiListUl />
          <NavLabel>Playlist</NavLabel>
        </NavItem>
        <NavItem to='/settings'>
          <BiUser />
          <NavLabel>Settings</NavLabel>
        </NavItem>
      </NavContainer>
    </>
  );
}
