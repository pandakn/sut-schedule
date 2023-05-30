type SkeletonProp = {
  count: number;
};

const SkeletonCourseTable = ({ count }: SkeletonProp) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <div key={index} className="mx-5 mb-5 border rounded-lg shadow-md ">
      <div className="flex flex-col p-5 mb-3 gap-y-2 animate-pulse">
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="w-1/3 h-10 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-32 h-4 bg-gray-200 rounded"></div>
        <div className="w-40 h-4 bg-gray-200 rounded"></div>
        <div className="w-48 h-4 bg-gray-200 rounded"></div>
        <div className="w-32 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Details each section */}
      <div className="flex flex-col gap-4">
        {/* Skeleton section */}
        <div className="flex flex-col justify-between bg-gray-200 border text-clip md:flex-row">
          <div className="py-2 pl-5 space-y-2 leading-relaxed">
            <div className="w-24 h-6 bg-gray-100 rounded"></div>
            <div className="h-4 bg-gray-100 rounded w-60"></div>
            <div className="flex gap-2">
              <div className="w-20 h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded w-28"></div>
              <div className="w-20 h-4 bg-gray-100 rounded"></div>
            </div>
            <div className="w-40 h-4 bg-gray-100 rounded"></div>
            <div className="w-48 h-4 bg-gray-100 rounded"></div>
          </div>
          {/* Skeleton button */}
          <div className="flex gap-x-1 ">
            <div className="w-10 h-full bg-gray-100 btn-logo"></div>
            <div className="w-10 h-full bg-gray-100 btn-logo"></div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <>{skeletonItems}</>;
};

export default SkeletonCourseTable;
