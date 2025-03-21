import { Suspense, useState } from "react";
import ErrorAlert from "../utils/ErrorAlert";
import { ErrorBoundary } from "../utils/ErrorBoundary";
import Loading from "../utils/Loading";
import ArtistList from "./ArtistList";
import ArtistListMore from "./ArtistListMore";

function ArtistSection() {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <section className="mb-10">
      <span className="mb-2 flex justify-between items-center">
        <h2 className="text-2xl">
          Artists
        </h2>
        <button
          className="px-3 py-1 rounded hover:bg-neutral-500/10"
          onClick={() => setShowMore(prev => !prev)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </span>

      <hr className="mt-1 mb-3 border-2 border-white/40" />

      <ul className="mx-auto w-fit grid min-2-cards:grid-cols-2 min-3-cards:grid-cols-3 min-4-cards:grid-cols-4 min-5-cards:grid-cols-5 min-6-cards:grid-cols-6 gap-4">
        <ErrorBoundary fallback={<ErrorAlert message="Something went wrong loading artists." />}>
          <Suspense fallback={<Loading size="medium" />}>
            <ArtistList />
          </Suspense>
        </ErrorBoundary>
        
        {showMore && (
          <ErrorBoundary fallback={<ErrorAlert message="Something went wrong loading more artists." />}>
            <Suspense fallback={<Loading size="medium" />}>
              <ArtistListMore />
            </Suspense>
          </ErrorBoundary>
        )}
      </ul>
    </section>
  );
}

export default ArtistSection;