import {
  ShimmerCardStyle,
  Loader,
  ShimmerMainContentStyle,
  ShimmerTask,
} from "./StyledComponents/ShimmerStyles";
import { TaskContainerStyle } from "./StyledComponents/MainContentStyles";
export const ShimmerCard = () => {
  return (
    <ShimmerCardStyle>
      <Loader h={15}></Loader>
      <div style={{ height: "50%" }}>
        <Loader w={"90%"} h={13}></Loader>
        <Loader w={"90%"} h={13}></Loader>
        <Loader w={"90%"} h={13}></Loader>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Loader w={"30%"} h={10}></Loader>
        <Loader w={"30%"} h={10}></Loader>
        <Loader w={"30%"} h={10}></Loader>
      </div>
    </ShimmerCardStyle>
  );
};

export const ShimmerMainContent = () => {
  return (
    <ShimmerMainContentStyle>
      <div
        className="inner-header "
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Loader h={"16"} w={"30%"}></Loader>
        <div className="filters" style={{ width: "50%" }}>
          <Loader h={"10"} w={"22%"}></Loader>
          <Loader h={"10"} w={"22%"}></Loader>
          <Loader h={"10"} w={"22%"}></Loader>
          <Loader h={"10"} w={"22%"}></Loader>
        </div>
      </div>
      <TaskContainerStyle id={"task-container"}>
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
      </TaskContainerStyle>
    </ShimmerMainContentStyle>
  );
};
export { ShimmerMainContentStyle };
