import styled, { keyframes } from "styled-components";

export const ButtonStyle = styled.button`
  height: ${({ h }) => (h ? h : "2rem")};
  width: ${({ w }) => (w ? w : "8rem")};
  background: ${({ bg }) => (bg ? bg : "#000")};
  padding: 0.2rem;
  outline: none;
  border-radius: ${({ brc }) => (brc ? brc : "0.4rem")};
  color: ${({ fc }) => (fc ? fc : "#fff")};
  border: ${({ brc }) => (brc ? brc : "none")};
  font-weight: 450;
  margin-right: 2rem;
  cursor: pointer;
  @media (max-width: 550px) {
    width: 25%;
    display: ${({ isWant }) => (isWant ? "block" : "none")}; //mobile
  }
  // margin: auto;
`;

// Spinner Animation
export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Spinner Component
export const Spinner = styled.div`
  width: 35px;
  height: 35px;
  border: 6px solid #ddd;
  border-top: 6px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Styled Loading Container
export const ProfileLoading = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  flex-direction: column;
  color: #000;
`;
