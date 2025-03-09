import styled, { keyframes } from "styled-components";

import {
  CartStyle,
  TaskContainerStyle,
  MainContentStyle,
} from "./MainContentStyles";
export const ShimmerMainContentStyle = styled(MainContentStyle)``;
export const ShimmerCardStyle = styled(CartStyle)`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  alighn-items: center;
  background: #fff;
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;
export const Loader = styled.div`
  position: relative;
  width: ${({ w }) => w ?? "90%"};
  height: ${({ h }) => h ?? "13"}px;
  background: #ccc;
  border-radius: 10px;
  margin: 5px;
  overflow: hidden; // Ensure the shimmer stays within bounds

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
    //background: red;
    animation: ${shimmer} 1.5s infinite linear;
`;
