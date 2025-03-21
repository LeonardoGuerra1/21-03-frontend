import { useState } from "react";
import TrackList from "./TrackList";
import TrackListMore from "./TrackListMore";
import SafeComponent from "../utils/SafeComponent";

function TrackSection() {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <section className="mb-10">
      <span className="mb-2 flex justify-between items-center">
        <h2 className="text-2xl">
          Tracks
        </h2>
        <button
          className="px-3 py-1 rounded hover:bg-neutral-500/10"
          onClick={() => setShowMore(prev => !prev)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </span>

      <hr className="mt-1 mb-3 border-2 border-white/40" />

      <ul className="mx-auto grid min-4-cards:grid-cols-2 gap-4">
        <SafeComponent errorMessage="Something went wrong loading tracks." loadingSize="medium">
          <TrackList />
        </SafeComponent>
        
        {showMore && (
          <SafeComponent errorMessage="Something went wrong loading more tracks." loadingSize="medium">
            <TrackListMore />
          </SafeComponent>
        )}
      </ul>

    </section>
  );
}

export default TrackSection;