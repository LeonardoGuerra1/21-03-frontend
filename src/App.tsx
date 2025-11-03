import { lazy, Suspense, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import SkeletonPage from "./pages/SkeletonPage";
import Navbar from "./components/layout/Navbar";
import { ROUTER } from "./router";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { useAuthStore } from "./stores/useAuthStore";
import SafeComponent from "./components/utils/SafeComponent";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants";
import AboutPage from "./pages/AboutPage";

const HomePage = lazy(() => import("./pages/HomePage"))
const DetailedTrackPage = lazy(() => import("./pages/DetailedTrackPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))

const PersonalInfo = lazy(() => import("./components/profile/PersonalInfo"))
const Favorites = lazy(() => import("./components/profile/Favorites"))
const Playlists = lazy(() => import("./components/profile/Playlists"))
const Security = lazy(() => import("./components/profile/Security"))
const Transactions = lazy(() => import("./components/profile/Transactions"))


function App() {
  const logged = useAuthStore().logged
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE_INFO] })
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE_SECURITY] })
  }, [logged]);

  return (
    <Router>
      <Suspense fallback={<SkeletonPage />}>
        <Navbar />

        <Routes>
          <Route path={ROUTER.INDEX.path} index element={<HomePage />} />
          <Route path={ROUTER.ABOUT.path} index element={<AboutPage />} />


          <Route path="/track/:id" element={<DetailedTrackPage />} />

          <Route path={ROUTER.PROFILE.path} element={
            <ProtectedRoute validate={logged}>
              <ProfilePage />
            </ProtectedRoute>
          } >
            <Route path={ROUTER.PROFILE.sub.PERSONAL_INFO} element={
              <SafeComponent errorMessage="Error" loadingSize="medium" key={ROUTER.PROFILE.sub.PERSONAL_INFO}>
                <PersonalInfo />
              </SafeComponent>
              } />
            <Route path={ROUTER.PROFILE.sub.FAVORITES} element={
              <SafeComponent errorMessage="Error" loadingSize="medium" key={ROUTER.PROFILE.sub.FAVORITES}>
                <Favorites />
              </SafeComponent>
              } />
            <Route path={ROUTER.PROFILE.sub.PLAYLISTS} element={
              <SafeComponent errorMessage="Error" loadingSize="medium" key={ROUTER.PROFILE.sub.PLAYLISTS}>
                <Playlists />
              </SafeComponent>
              } />
            <Route path={ROUTER.PROFILE.sub.SECURITY} element={
              <SafeComponent errorMessage="Error" loadingSize="medium" key={ROUTER.PROFILE.sub.SECURITY}>
                <Security />
              </SafeComponent>
              } />
            <Route path={ROUTER.PROFILE.sub.TRANSACTIONS} element={
              <SafeComponent errorMessage="Error" loadingSize="medium" key={ROUTER.PROFILE.sub.TRANSACTIONS}>
                <Transactions />
              </SafeComponent>
              } />
          </Route>

        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
