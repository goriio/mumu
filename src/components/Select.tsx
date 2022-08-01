import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--color-fg);
  }
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  margin-right: 0.5rem;
  font-size: 1.25rem;
`;

const Text = styled.span``;

interface SelectProps {
  icon?: ReactNode;
  text: string;
  onClick?: () => void;
}

export function Select({ icon, text, onClick }: SelectProps) {
  return (
    <StyledSelect onClick={onClick}>
      <Icon>{icon}</Icon>
      <Text>{text}</Text>
    </StyledSelect>
  );
}
