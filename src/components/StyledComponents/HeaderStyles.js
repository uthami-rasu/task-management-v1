import styled from "styled-components";

const HeaderStyle = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 40px 1fr;
  column-gap: 0.7rem;
  @media (max-width: 550px) {
    height: 50px;
    .name-task h2 {
      font-size: 18px;
      margin-top: 3px;
    }
    .name-task span {
      font-size: 9px;
    }
  }
`;

export { HeaderStyle };
