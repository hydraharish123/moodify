import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { checkTokenExpiry } from "../services/checkExpiry";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfileData] = useState(null);

  async function profileData(token) {
    try {
      console.log(token);
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch genre seeds: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log(data);
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);

    if (token) {
      profileData(token);
    }
  }, []);

  useEffect(() => {
    checkTokenExpiry();

    const intervalId = setInterval(() => {
      checkTokenExpiry();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledAppLayout>
      <Header name={profile?.display_name} img_obj={profile?.images[0]} />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
