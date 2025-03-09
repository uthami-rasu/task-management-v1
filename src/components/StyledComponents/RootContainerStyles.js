import styled from "styled-components";
export const ContainerStyle = styled.div`
  height: 99vh;
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main profile";
  grid-template-columns: 40px 9fr 2fr;
  grid-template-rows: 50px 1fr;
  gap: 0.5rem;

  @media (max-width: 550px) {
    position: relative;
    display: flex !important; //ch
    flex-direction: column;
    flex-wrap: no-wrap;
    gap: 0px;
  }
`;
