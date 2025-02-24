import styled from "styled-components";
import Logo from "../assets/logo.png";

import { useTasks } from "./utils";

import { RadialChart } from "./RatialChart";
export const ProfileStyle = styled.div`
  grid-area: profile;
  display: grid;
  height: 80vh;
  grid-template-rows: 4rem 28vh 38vh 3rem;
  row-gap: 0.5rem;
`;

const ProfileNameStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
`;

const ProfileAllTasks = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1;
  grid-template-rows: 1fr 1fr;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const ProfileAnalytics = styled.div``;

const ProfileSignOut = styled.div`
  background: orangered;
  width: 85%;
  margin: auto;
  color: #fff;
  text-align: center;
  border-radius: 2rem;
  font-weight: 500;
  padding: 0.2rem;
`;

const ImageTag = styled.img`
  height: 70%;
  width: 30%;
  background: red;
`;

function TaskMiniCard({ heading, taskcount }) {
  return (
    <>
      <div className="grp-t">
        <p>{heading}:</p>
        <div className="grp-t1">
          <div className="bar"></div>
          <p>{taskcount}</p>
        </div>
      </div>
    </>
  );
}

function Profile() {
  let { completedTasks, activeTasks, tasks } = useTasks();

  return (
    <ProfileStyle>
      <ProfileNameStyle>
        <div class="profile-card">
          <div class="profile-image">
            <img src={Logo} alt="avatar" width="50" height="50" />
          </div>
          <div class="profile-text">
            <h1>
              <span class="hello-text">Hello,</span>
              <span class="user-name">User Name</span>
            </h1>
          </div>
        </div>
      </ProfileNameStyle>
      <ProfileAllTasks>
        <div class="stats-container">
          <div class="stats-grid">
            <div class="stat-box">
              <p>Total Tasks:</p>
              <p class="stat-value">
                <span class="stat-bar purple"></span>
                <span class="number">{tasks.length}</span>
              </p>
            </div>
            <div class="stat-box">
              <p>In Progress:</p>
              <p class="stat-value">
                <span class="stat-bar blue"></span>
                <span class="number">{activeTasks}</span>
              </p>
            </div>
            <div class="stat-box">
              <p>Open Tasks:</p>
              <p class="stat-value">
                <span class="stat-bar orange"></span>
                <span class="number">{activeTasks}</span>
              </p>
            </div>
            <div class="stat-box">
              <p>Completed:</p>
              <p class="stat-value">
                <span class="stat-bar green"></span>
                <span class="number">{completedTasks}</span>
              </p>
            </div>
          </div>
        </div>
      </ProfileAllTasks>

      <ProfileAnalytics>
        {" "}
        <RadialChart />
      </ProfileAnalytics>
      <ProfileSignOut> Sign Out</ProfileSignOut>
    </ProfileStyle>
  );
}

export default Profile;
