import moment from "moment";
import {
  ProfileLoading,
  Spinner,
} from "../components/StyledComponents/UtilsStyles";
export const timeAgo = (timestamp) => {
  const now = moment();
  const createdTime = moment(timestamp);
  const diffInSeconds = now.diff(createdTime, "seconds");
  const diffInMinutes = now.diff(createdTime, "minutes");
  const diffInHours = now.diff(createdTime, "hours");
  const diffInDays = now.diff(createdTime, "days");

  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return createdTime.format("YYYY-MM-DD");
};

export function LoadingProfile() {
  return (
    <ProfileLoading>
      <Spinner />
      <p>Loading..</p>
    </ProfileLoading>
  );
}

export const generateId = () =>
  crypto.randomUUID().replace(/-/g, "").slice(0, 6);



