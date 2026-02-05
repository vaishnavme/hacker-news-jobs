import { useQuery } from "@tanstack/react-query";
import { jobsAPI } from "@/lib/api";
import { JobPost } from "@/lib/global.types";
import JobCard, { JobSkeletonCard } from "./job-card";

const AllJobs = () => {
  const feedData = useQuery({
    queryKey: ["all-jobs-data"],
    queryFn: async () => {
      const response = await jobsAPI.allJobs();
      return response.data;
    },
  });

  return (
    <div>
      {feedData.isLoading ? (
        <div>
          {new Array(10).fill(null).map((_, index) => (
            <JobSkeletonCard key={`skeleton-${index + 2}`} />
          ))}
        </div>
      ) : null}
      {!feedData.isLoading && feedData.data.length > 0 ? (
        <div>
          {feedData.data.map((job: JobPost) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default AllJobs;
