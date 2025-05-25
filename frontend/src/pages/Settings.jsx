import styled from "styled-components";
import Heading from "../ui/Heading";
import SettingsDescription from "../features/Settings/SettingsDescription";
import UserDetails from "../features/Settings/UserDetails";

const StyledSettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

function Settings() {
  return (
    <StyledSettingsDiv>
      <Heading as="h1">Settings</Heading>
      <SettingsDescription />
      <UserDetails />
    </StyledSettingsDiv>
  );
}

export default Settings;
