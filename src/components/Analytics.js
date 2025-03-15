import Logo from "../assets/logo.png";

import { LoadingProfile } from "../Utils/utils";
import useTasks from "../context/usertasks";
import { RadialChart } from "./RatialChart";
import { useUserContext } from "../context/usercontext";

import {
  ProfileStyle,
  ProfileNameStyle,
  ProfileAllTasks,
  ProfileAnalytics,
  ProfileSignOut,
} from "./StyledComponents/ProfileStyles";
import useTaskDetails from "../Hooks/useTaskDetails";

function Profile() {
  let { tasks } = useTasks();

  const [activeTasks, completedTasks] = useTaskDetails();

  console.log(activeTasks, completedTasks);
  let {
    userName,
    loginStatus,
    loading,
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
                    <span className="number">{activeTasks ?? 0}</span>
                  </p>
                </div>
                <div className="stat-box box-3">
                  <p>Open Tasks:</p>
                  <p className="stat-value">
                    <span className="stat-bar orange"></span>
                    <span className="number">{activeTasks ?? 0}</span>
                  </p>
                </div>
                <div className="stat-box box-4">
                  <p>Completed:</p>
                  <p className="stat-value">
                    <span className="stat-bar green"></span>
                    <span className="number">{completedTasks ?? 0}</span>
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
