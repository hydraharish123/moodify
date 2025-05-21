import styled from "styled-components";
import Description from "../features/Dashboard/Description";
import Heading from "../ui/Heading";
import Test from "../features/Dashboard/Test";
import UserStats from "../features/Dashboard/UserStats";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <Heading as="h1">Welcome to Moodify</Heading>
      <Description />
      <UserStats />
    </StyledDashboard>
  );
}

export default Dashboard;
