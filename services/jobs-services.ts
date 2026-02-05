import axios from "axios";

const JobServices = {
  getPostById: async (id: string) => {
    try {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      return response.data;
    } catch (err) {
      return null;
    }
  },
  getAllPostByIds: async (ids: string[]) => {
    try {
      const result = await Promise.all(
        ids.map(async (id) => {
          const jobPost = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          );

          return jobPost.data;
        }),
      );
      return result;
    } catch (err) {
      return [];
    }
  },
};

export default JobServices;
