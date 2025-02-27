import styled from "styled-components";
import Logo from "../assets/logo.png";

import { useTasks,LoadingProfile } from "./utils";

import { RadialChart } from "./RatialChart";
import { useUserContext } from "../context/usercontext";

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

const ProfileSignOut = styled.button`
  background: orangered;
  width: 85%;
  margin: auto;
  color: #fff;
  text-align: center;
  border-radius: 2rem;
  font-weight: 500;
  padding: 0.2rem;
  cursor:pointer;
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
const LoadingStyle = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-items: center;
  align-items: center;
`;




function Profile() {
  let { completedTasks, activeTasks, tasks } = useTasks();

  let { userName, loginStatus, loading ,BASE_URL,setLoginStatus,navigate} = useUserContext();

  const deleteCookies = async ()=>{

    const res = await fetch(BASE_URL+"/auth/logout",{
      method:"POST",
      credentials:"include"
    });
   
    if(res.ok){
      const result = await res.json();

      alert(result.message);
    }
    setLoginStatus(false);
    navigate('/auth/login');
}


  return (
    <>

      {!loading && loginStatus ? (
        <ProfileStyle>
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
                <div className="stat-box">
                  <p>Total Tasks:</p>
                  <p className="stat-value">
                    <span className="stat-bar purple"></span>
                    <span className="number">{tasks.length}</span>
                  </p>
                </div>
                <div className="stat-box">
                  <p>In Progress:</p>
                  <p className="stat-value">
                    <span className="stat-bar blue"></span>
                    <span className="number">{activeTasks}</span>
                  </p>
                </div>
                <div className="stat-box">
                  <p>Open Tasks:</p>
                  <p className="stat-value">
                    <span className="stat-bar orange"></span>
                    <span className="number">{activeTasks}</span>
                  </p>
                </div>
                <div className="stat-box">
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

          <ProfileSignOut onClick={deleteCookies}> {loginStatus ? "Logout" : "Login"}</ProfileSignOut>
        </ProfileStyle>
      ) : <LoadingProfile/>}

    </>
  );
}

export default Profile;
