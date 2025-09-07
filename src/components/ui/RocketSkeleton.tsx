const RocketCardSkeleton = () => {
  return (
    <div className="min-w-[300px] mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="w-full h-48 bg-gray-300" />

      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        <div className="h-9 bg-gray-300 rounded w-24 mt-4" />
      </div>
    </div>
  );
};

export default RocketCardSkeleton;
