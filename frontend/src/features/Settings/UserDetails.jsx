import Spinner from "../../ui/Spinner";
import { useProfile } from "../Dashboard/useProfile";
function UserDetails() {
  const { data, isLoading } = useProfile();
  if (isLoading) return <Spinner />;

  const { username, spotify_id, image, favorites, created_at, token_created } =
    data[0];
  return (
    <div className="w-full p-8 bg-[#1f2937] rounded-2xl shadow-lg text-white">
      <div className="flex items-center space-x-6 mb-10">
        <img
          src={image}
          alt="Profile-image"
          className="w-24 h-24 rounded-full border-2 border-zinc-600 shadow-md"
        />
        <div>
          <h2 className="text-4xl font-bold">{username}</h2>
          <p className="text-lg text-zinc-400 mt-1">Spotify ID: {spotify_id}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-14">
        <div>
          <h3 className="text-3xl font-bold mb-4">Account Info</h3>
          <p className="text-xl text-zinc-200 mb-2">
            <span className="font-semibold text-white">Created:</span>{" "}
            {new Date(created_at).toLocaleString()}
          </p>
          <p className="text-xl text-zinc-200">
            <span className="font-semibold text-white">Token Refreshed:</span>{" "}
            {new Date(token_created).toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-4">Favorites</h3>
          <p className="text-xl text-zinc-200">
            <span className="font-semibold text-white">Total Favorites:</span>{" "}
            {favorites?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
