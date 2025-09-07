const HistorySkeleton = () => {
  return Array.from({ length: 5 }).map((_, idx) => (
    <div key={idx} className="mb-10 ml-6 animate-pulse">
      {/* Dot */}
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 ring-4 ring-gray-900" />

      {/* Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
        <div className="h-6 w-48 bg-gray-600 rounded mb-3" />
        <div className="h-4 w-full bg-gray-700 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-700 rounded mb-4" />
        <div className="h-4 w-20 bg-gray-700 rounded" />
      </div>
    </div>
  ));
};

export default HistorySkeleton;
