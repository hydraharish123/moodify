import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import LoginWithSpotify from "./test/LoginWithSpotify";
import CallbackHandler from "./test/CallbackHandler";
import Settings from "./pages/Settings";
import Recommend from "./pages/Recommend";
import Favorites from "./pages/Favorites";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* Public login route */}
          <Route path="/" element={<LoginWithSpotify />} />

          {/* Callback handler route (Spotify redirects here) */}
          <Route path="/callback" element={<CallbackHandler />} />

          {/* Protected area wrapped with AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="recommend" element={<Recommend />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
