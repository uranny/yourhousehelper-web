import styled from "styled-components";
import { colors } from "../../../constants/color";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${colors.SURFACE};
  border: 1px solid ${colors.BORDER};
  border-radius: 1.2rem;
  padding: 0;
  min-width: 40rem;
  max-width: 50rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 0.1rem solid ${colors.BORDER};
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${colors.TEXT};
  font-size: 1.8rem;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.TEXT_SUB};
  font-size: 2.4rem;
  cursor: pointer;
  padding: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${colors.TEXT};
  }
`;

export const ModalBody = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const Label = styled.label`
  color: ${colors.TEXT_SUB};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const Select = styled.select`
  padding: 0.8rem 1rem;
  background: ${colors.BACKGROUND};
  border: 0.1rem solid ${colors.BORDER};
  border-radius: 0.6rem;
  color: ${colors.TEXT_SUB};
  font-size: 1.35rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.PRIMARY};
    background: ${colors.BACKGROUND};
  }

  option {
    background: ${colors.SURFACE};
    color: ${colors.TEXT_SUB};
  }
`;

export const DateInfo = styled.p`
  margin: 0;
  padding: 1rem;
  background: ${colors.BACKGROUND};
  border-radius: 0.6rem;
  color: ${colors.TEXT_SUB};
  font-size: 1.35rem;
  text-align: center;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.6rem;
  border-top: 0.1rem solid ${colors.BORDER};
`;

export const CancelButton = styled.button`
  padding: 0.7rem 1.6rem;
  background: ${colors.PRIMARY};
  border: 0.1rem ${colors.BORDER};
  border-radius: 0.6rem;
  color: ${colors.TEXT_SUB};
  font-size: 1.35rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.SECONDARY};
  }
`;

export const SubmitButton = styled.button`
  padding: 0.7rem 1.6rem;
  background: ${colors.PRIMARY};
  border: none;
  border-radius: 0.6rem;
  color: ${colors.TEXT};
  font-size: 1.35rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${colors.SURFACE};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
