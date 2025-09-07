const RocketDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Page Title */}
      <div className="text-center mt-6">
        <div className="h-10 w-64 bg-gray-700 rounded mx-auto"></div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg mt-8">
        <div className="w-full h-full bg-gray-700" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-3">
          <div className="h-8 w-48 bg-gray-600 rounded" />
          <div className="h-5 w-32 bg-gray-600 rounded" />
        </div>
      </div>

      {/* Details Section */}
      <div className="py-12 max-w-4xl mx-auto text-center space-y-8">
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-11/12 mx-auto" />
          <div className="h-4 bg-gray-700 rounded w-10/12 mx-auto" />
          <div className="h-4 bg-gray-700 rounded w-8/12 mx-auto" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div className="bg-white/5 p-6 rounded-lg shadow-md space-y-3">
            <div className="h-5 bg-gray-600 rounded w-1/2" />
            <div className="h-4 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
          </div>

          <div className="bg-white/5 p-6 rounded-lg shadow-md space-y-3">
            <div className="h-5 bg-gray-600 rounded w-1/2" />
            <div className="h-4 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <div className="h-10 w-32 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};

export default RocketDetailsSkeleton;
