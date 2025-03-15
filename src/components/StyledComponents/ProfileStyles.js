import styled, { keyframes } from "styled-components";

export const ProfileStyle = styled.div`
  grid-area: profile;
  display: grid;
  height: 80vh;
  grid-template-rows: 4rem 28vh 38vh 3rem;
  row-gap: 0.5rem;

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    // background: red;
    height: 90%;
    width: 96%;
    margin: auto;
    position: absolute;
    top: 5%;
    display: none;
  }
`;

export const ProfileNameStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  width: 100%;

  @media (max-width: 550px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const ProfileAllTasks = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1;
  grid-template-rows: 1fr 1fr;
  padding: 0.5rem;
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    height: 250px;
  }
`;

export const ProfileAnalytics = styled.div`
  width: 96%;
  @media (max-width: 550px) {
    width: 96%;
    margin: auto;
  }
`;

export const ProfileSignOut = styled.button`
  background: orangered;
  width: 85%;
  margin: auto;
  color: #fff;
  text-align: center;
  border-radius: 2rem;
  font-weight: 500;
  padding: 0.2rem;
  cursor: pointer;

  z-index: 10;
  margin: auto;
`;

export const ImageTag = styled.img`
  height: 70%;
  width: 30%;
  background: red;
`;

export const LoadingStyle = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-items: center;
  align-items: center;
`;
