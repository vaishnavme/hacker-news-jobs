import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import JobServices from "@/services/jobs-services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/jobstories.json",
    );
    const jobPostIds: string[] = response.data;
    const result = await JobServices.getAllPostByIds(jobPostIds);
    return res.status(200).send({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        message: "Something went wrong while fetching job posts.",
      },
    });
  }
};

export default handler;
