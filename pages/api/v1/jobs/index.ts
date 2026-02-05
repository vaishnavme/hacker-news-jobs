import { PostType } from "@/lib/global.types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, ...rest } = req.query;

  const pageNumber = parseInt((page as string) || "0", 10);
  const hasOtherQueries = Object.keys(rest).length > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = hasOtherQueries
    ? { ...rest, tags: "story" }
    : { tags: "story,author_whoishiring", page: pageNumber };

  if (pageNumber > 0) {
    query.page = pageNumber;
  }

  try {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?${new URLSearchParams(
        query,
      ).toString()}`,
    );
    let posts = response.data.hits || [];

    if (!hasOtherQueries) {
      posts = posts.filter((post: PostType) => {
        const jobTitle = post.title.toLowerCase();
        return (
          !jobTitle.includes("who wants to be hired") &&
          !jobTitle.includes("ask hn: freelancer? seeking freelancer? ")
        );
      });
    }

    return res.status(200).send({
      success: true,
      data: posts,
    });
  } catch (_err) {
    res.status(500).send({
      success: false,
      error: {
        message: "Something went wrong while fetching job posts.",
      },
    });
  }
};

export default handler;
