export type JobPost = {
  by?: string;
  id: number;
  score: number;
  time?: number;
  title: string;
  type: string;
  url: string;
  author?: string;
  created_at_i?: number;
};

export type PostType = {
  author: string;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  points: number;
  story_id: number;
  story_text: string;
  title: string;
  updated_at: string;
  url?: string;
};
