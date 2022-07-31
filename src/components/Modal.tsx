import { useRef, MouseEvent, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { BiX } from 'react-icons/bi';

const StyledModal = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--overlay);
  z-index: var(--z-index-modal);
`;

const Card = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  padding-top: 2rem;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  background: var(--color-bg);

  @media screen and (min-width: 768px) {
    bottom: unset;
    border-radius: var(--border-radius);
  }
`;

const Close = styled(BiX)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.75rem;
  cursor: pointer;
`;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  const clickOutside = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  function handleClickOutside(event: MouseEvent<HTMLDivElement>) {
    if (event.target === clickOutside.current) {
      setIsOpen(false);
    }
  }

  return (
    <>
      {isOpen && (
        <StyledModal ref={clickOutside} onClick={handleClickOutside}>
          <Card>
            {children}
            <Close onClick={() => setIsOpen(false)} />
          </Card>
        </StyledModal>
      )}
    </>
  );
}
