import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginWithSpotify from "./LoginWithSpotify";
import CallbackHandler from "./CallbackHandler";

const AppPage = () => {
  return <div>Welcome! You are logged in with Spotify.</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWithSpotify />} />
        <Route path="/callback" element={<CallbackHandler />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  );
}

export default App;
