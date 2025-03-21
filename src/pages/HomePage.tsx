import AlbumSection from "../components/albums/AlbumSection";
import ArtistSection from "../components/artists/ArtistSection";
import TrackSection from "../components/tracks/TrackSection";

function HomePage() {
  return (
    <div className="max-w-page mt-10 mx-auto">

      <div className="w-[236px] min-2-cards:w-[488px] min-3-cards:w-[740px] min-4-cards:w-[992px] min-5-cards:w-[1244px] min-6-cards:w-full max-w-[1500px] mx-auto">
        <TrackSection />
        <AlbumSection />
        <ArtistSection />
      </div>

    </div>
  );
}

export default HomePage;