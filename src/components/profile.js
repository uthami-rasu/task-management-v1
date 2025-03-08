import styled from "styled-components";
import Logo from "../assets/logo.png";

import { useTasks, LoadingProfile } from "./utils";

import { RadialChart } from "./RatialChart";
import { useUserContext } from "../context/usercontext";

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

const ProfileNameStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;

  @media (max-width: 550px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const ProfileAllTasks = styled.div`
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

const ProfileAnalytics = styled.div`
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

const ImageTag = styled.img`
  height: 70%;
  width: 30%;
  background: red;
`;

const LoadingStyle = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-items: center;
  align-items: center;
`;

function Profile() {
  let { completedTasks, activeTasks, tasks } = useTasks();

  let {
    userName,
    loginStatus,
    loading,
    BASE_URL,
    setLoginStatus,
    navigate,
    deleteCookies: logout,
  } = useUserContext();

  if (!loginStatus) {
    return;
  }

  return (
    <>
      {!loading && loginStatus ? (
        <ProfileStyle className="profile-container">
          <ProfileNameStyle>
            <div className="profile-card">
              <div className="profile-image">
                <img src={Logo} alt="avatar" width="50" height="50" />
              </div>
              <div className="profile-text">
                <h1>
                  <span className="hello-text">Hello,</span>
                  <span className="user-name">
                    {userName ? userName : "Buddy!"}
                  </span>
                </h1>
              </div>
            </div>
          </ProfileNameStyle>
          <ProfileAllTasks>
            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-box box-1">
                  <p>Total Tasks:</p>
                  <p className="stat-value">
                    <span className="stat-bar purple"></span>
                    <span className="number">{tasks.length}</span>
                  </p>
                </div>
                <div className="stat-box box-2">
                  <p>In Progress:</p>
                  <p className="stat-value">
                    <span className="stat-bar blue"></span>
                    <span className="number">{activeTasks}</span>
                  </p>
                </div>
                <div className="stat-box box-3">
                  <p>Open Tasks:</p>
                  <p className="stat-value">
                    <span className="stat-bar orange"></span>
                    <span className="number">{activeTasks}</span>
                  </p>
                </div>
                <div className="stat-box box-4">
                  <p>Completed:</p>
                  <p className="stat-value">
                    <span className="stat-bar green"></span>
                    <span className="number">{completedTasks}</span>
                  </p>
                </div>
              </div>
            </div>
          </ProfileAllTasks>

          <ProfileAnalytics>
            <RadialChart />
          </ProfileAnalytics>

          <ProfileSignOut onClick={logout} className="logout-pc">
            Logout
          </ProfileSignOut>
        </ProfileStyle>
      ) : (
        <LoadingProfile />
      )}
    </>
  );
}

export default Profile;
