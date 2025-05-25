import { Outlet, useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useEffect } from "react";
import { checkTokenExpiry } from "../hooks/checkExpiry";
import { useProfile } from "../features/Dashboard/useProfile";
import Spinner from "../ui/Spinner";

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
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const spotify_id = searchParams.get("spotify_id");
    checkTokenExpiry(spotify_id);

    const intervalId = setInterval(() => {
      checkTokenExpiry(spotify_id);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [searchParams]);

  const { data, isLoading } = useProfile();

  if (isLoading) return <Spinner />;

  return (
    <StyledAppLayout>
      <Header name={data?.[0]?.username} image={data?.[0]?.image} />
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
