import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";

export default function TrackTable({ emotion }) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const allTracks = emotion?.tracks || [];

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedTracks = allTracks.slice(start, end);

  return (
    <Table columns="1fr 2fr 2fr 1fr 0.5fr">
      <Table.Header>
        <div>Track No.</div>
        <div>Track name</div>
        <div>Artist</div>
        <div>Spotify Link</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={paginatedTracks}
        render={(track, i) => (
          <Table.Row key={track.id || i}>
            <p>{start + i + 1}</p>
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

      <Table.Footer>
        <Pagination count={allTracks.length} />
      </Table.Footer>
    </Table>
  );
}
