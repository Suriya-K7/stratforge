import { HistorySkeleton } from "../components/ui";
import { useAllHistory } from "../hooks/useHistory";
import { Applayout } from "../layout";
import type { HistoryEvent } from "../types/History";

const History = () => {
  const { data, isLoading } = useAllHistory();

  const historyEvents = data as HistoryEvent[];

  console.log(data);

  return (
    <Applayout>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          History
        </h1>
      </div>
      <div className="py-10 flex flex-wrap gap-10 items-start justify-center"></div>
      <div className="relative border-l border-gray-700 max-w-3xl mx-auto p-6">
        {isLoading && <HistorySkeleton />}
        {historyEvents &&
          historyEvents.map((event) => (
            <div key={event.id} className="mb-10 ml-6">
              {/* Dot */}
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 ring-4 ring-gray-900">
                <svg
                  className="h-3 w-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="10" />
                </svg>
              </span>

              {/* Card */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <time className="text-sm text-gray-400">
                  {new Date(event.event_date_utc).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="text-xl font-semibold text-white mt-2">
                  {event.title}
                </h3>
                <p className="text-gray-300 mt-2">{event.details}</p>

                {event.links.article && (
                  <a
                    href={event.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Read more →
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </Applayout>
  );
};

export default History;
