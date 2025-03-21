interface SkeletonProps {
  width?: number | string
  height?: number | string
}

const Skeleton = ({ width, height }: SkeletonProps) => (
    <div style={{ width, height }} className="bg-slate-500/40 animate-skeleton rounded-lg"></div>
)

function SkeletonPage() {
  return (
    <>
      <div className="mb-10">
        <Skeleton width="100%" height="70px" />
      </div>
       
      <div className="w-[333px] min-2-cards:w-[590px] min-3-cards:w-[893px] min-4-cards:w-[1196px] min-5-cards:w-full max-w-[1500px] mx-auto">

        <Skeleton width="100%" height="30px" />
        <div className="mt-3 mb-10 grid min-3-cards:grid-cols-2 gap-3">
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </div>
        
        <Skeleton width="100%" height="30px" />
        <div className="mt-3 mb-10 grid min-2-cards:grid-cols-2 min-3-cards:grid-cols-3 min-4-cards:grid-cols-4 min-5-cards:grid-cols-5 gap-3">
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
          <Skeleton height="280px" />
        </div>
      </div>
    </>
  );
}

export default SkeletonPage;