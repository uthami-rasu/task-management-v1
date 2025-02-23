import styled from "styled-components";
import Logo from "../assets/logo.png";
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

const ProfileAnalytics = styled.div`
  background: navy;
`;

const ProfileSignOut = styled.div`
  background: red;
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
                <span class="number">0</span>
              </p>
            </div>
            <div class="stat-box">
              <p>In Progress:</p>
              <p class="stat-value">
                <span class="stat-bar blue"></span>
                <span class="number">0</span>
              </p>
            </div>
            <div class="stat-box">
              <p>Open Tasks:</p>
              <p class="stat-value">
                <span class="stat-bar orange"></span>
                <span class="number">0</span>
              </p>
            </div>
            <div class="stat-box">
              <p>Completed:</p>
              <p class="stat-value">
                <span class="stat-bar green"></span>
                <span class="number">0</span>
              </p>
            </div>
          </div>
        </div>
      </ProfileAllTasks>

      <ProfileAnalytics> completed tasks</ProfileAnalytics>
      <ProfileSignOut> Sign Out</ProfileSignOut>
    </ProfileStyle>
  );
}

export default Profile;
