import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useProfile } from "../Dashboard/useProfile";

function FavoritesTable() {
  const { data, isLoading } = useProfile();
  if (isLoading) return <Spinner />;
  console.log(data);
  return (
    <Table columns="1fr 2fr 2fr 1fr">
      <Table.Header>
        <div>Track No.</div>
        <div>Track name</div>
        <div>Artist</div>
        <div>Spotify Link</div>
      </Table.Header>

      <Table.Body
        data={data?.[0]?.favorites}
        render={(track, i) => (
          <Table.Row key={track.id || i}>
            <p>{i + 1}</p>
            <p>{track?.track_name}</p>
            <p>{track?.artists}</p>
            <a
              href={track?.spotify_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Play Song
            </a>
          </Table.Row>
        )}
      />
    </Table>
  );
}

export default FavoritesTable;
