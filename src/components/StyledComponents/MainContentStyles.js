import styled from "styled-components";

export const MainContentStyle = styled.div`
  grid-area: main;
  background: #eaeaea;
  padding: 0.5rem;
  border-radius: 0.3rem;
  // border: 1px solid #000;
  box-shadow: 0 0 1px #000;
  display: grid;
  grid-template-rows: 2.5rem 80vh;
  row-gap: 0.2rem;
  @media (max-width: 550px) {
    width: 100%;
    padding: 3px 3px;
    height: 100dvh;
    padding-bottom: 20px;
  }
`;

export const TaskContainerStyle = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
  overflow-y: scroll !important;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
    background: #4a90e2;
  }
  &::-webkit-scrollbar-thumb {
    width: 8px;
    border-radius: 3px;
    background: linear-gradient(45deg, #ff7eb3, #ff758c);
  }
  &::-webkit-scrollbar-track {
    background: #e3f2fd;
  }

  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 15px;
    height: 100%;
    margin-bottom: 40px;
    overflow-y: scroll !important;
  }
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    row-gap: 0.8rem;
  }
`;

export const CartStyle = styled.div`
  padding: 0.5rem;
  box-shadow: 0 0 1px #bbb;
  background: #f8f9fa;
  display: grid;
  grid-template-rows: 2rem 4rem 1fr;
  border-radius: 0.4rem;
  oveflow: hidden;
  height: 12rem;
  border: ${({ border }) => (border ? "3px dotted grey" : "none")};

  @media (max-width: 540px) {
    width: 96%;
    margin: 0 auto;
  }
`;
