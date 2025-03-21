import { Suspense, useState } from "react";
import AlbumList from "./AlbumList";
import { ErrorBoundary } from "../utils/ErrorBoundary";
import ErrorAlert from "../utils/ErrorAlert";
import Loading from "../utils/Loading";
import AlbumListMore from "./AlbumListMore";

function AlbumSection() {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <section className="mb-10">
      <span className="mb-2 flex justify-between items-center">
        <h2 className="text-2xl">
          Albums
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
        <ErrorBoundary fallback={<ErrorAlert message="Something went wrong loading albums." />}>
          <Suspense fallback={<Loading size="medium" />}>
            <AlbumList />
          </Suspense>
        </ErrorBoundary>
        
        {showMore && (
          <ErrorBoundary fallback={<ErrorAlert message="Something went wrong loading more albums." />}>
            <Suspense fallback={<Loading size="medium" />}>
              <AlbumListMore />
            </Suspense>
          </ErrorBoundary>
        )}
      </ul>
    </section>
  );
}

export default AlbumSection;