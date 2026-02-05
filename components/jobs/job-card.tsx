import { HugeiconsIcon } from "@hugeicons/react";
import { Link01FreeIcons } from "@hugeicons/core-free-icons";
import { PostType } from "@/lib/global.types";
import { Button } from "../ui/button";
import { formatUnixDate, getHackerNewsItemUrl } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface JobCardProps {
  post: PostType;
}

const JobCard = (props: JobCardProps) => {
  const { post } = props;

  return (
    <div className="p-2 flex items-start justify-between">
      <div className="space-y-0.5">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={getHackerNewsItemUrl(post.story_id)}
        >
          <h3 className="font-medium text-sm hover:underline">{post.title}</h3>
        </a>
        <p className="text-xs text-neutral-500">
          @{post.author} ·{" "}
          <span className="font-mono">{formatUnixDate(post.created_at_i)}</span>
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        render={
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={getHackerNewsItemUrl(post.story_id)}
          />
        }
      >
        <HugeiconsIcon icon={Link01FreeIcons} strokeWidth={2} />
      </Button>
    </div>
  );
};

export default JobCard;

export const JobSkeletonCard = () => (
  <div className="p-2 flex items-start justify-between">
    <div className="flex flex-col gap-1">
      <Skeleton className="h-5 w-64" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
    <Skeleton className="size-6 mr-1" />
  </div>
);
