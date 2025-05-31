import styled, { keyframes, css } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
`;
const TaskFormStyle = styled.div`
  position: absolute;
  background: #e8f9ff;
  backdrop-filter: blur(15px); /* Blurs everything behind */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 450px;
  width: 320px;
  border-radius: 0.8rem;
  background: #eaeaea;
  padding: 0.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
  border: 0.5px solid #bbb;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  z-index: 8;
  ${({ isVisible }) =>
    isVisible
      ? css`
          animation: ${fadeIn} 0.3s forwards;
        `
      : css`
          animation: ${fadeOut} 0.3s forwards;
        `}
  @media(min-width:680px) {
    height: 400px;
    width: 550px;
  }
  background: #fff;
`;
export { TaskFormStyle };
