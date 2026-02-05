import axios from "axios";

type ApiVersion = "v1" | "v2";

const createInstance = (version: ApiVersion) => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${version}`,
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
  );

  return instance;
};

const apiV1 = createInstance("v1");

export const jobsAPI = {
  allJobs: () => apiV1.get("/jobs"),
};
