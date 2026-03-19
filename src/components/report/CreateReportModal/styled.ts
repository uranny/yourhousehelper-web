import styled from "styled-components";

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
  background: #23293d;
  border: 1px solid #31384f;
  border-radius: 1.2rem;
  padding: 0;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 1px solid #31384f;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b8c1e0;
  font-size: 2.4rem;
  cursor: pointer;
  padding: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffffff;
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
  color: #e7ebfb;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const Select = styled.select`
  padding: 0.8rem 1rem;
  background: #1a1f31;
  border: 1px solid #3a4361;
  border-radius: 0.6rem;
  color: #e7ebfb;
  font-size: 1.35rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #5b5fc7;
    background: #20253c;
  }

  option {
    background: #23293d;
    color: #e7ebfb;
  }
`;

export const DateInfo = styled.p`
  margin: 0;
  padding: 1rem;
  background: #1a1f31;
  border-radius: 0.6rem;
  color: #b8c1e0;
  font-size: 1.35rem;
  text-align: center;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.6rem;
  border-top: 1px solid #31384f;
`;

export const CancelButton = styled.button`
  padding: 0.7rem 1.6rem;
  background: #1a1f31;
  border: 1px solid #3a4361;
  border-radius: 0.6rem;
  color: #e7ebfb;
  font-size: 1.35rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #20253c;
    border-color: #4a5270;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.7rem 1.6rem;
  background: #5b5fc7;
  border: none;
  border-radius: 0.6rem;
  color: #ffffff;
  font-size: 1.35rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #4a4fa8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
