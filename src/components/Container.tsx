import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;

  @media screen and (min-width: 768px) {
    padding-left: calc(var(--nav-lg-screen-width) + 3rem);
    margin: 0;
  }
`;
