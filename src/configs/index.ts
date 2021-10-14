export const config = {
  name: process.env.REACT_APP_NAME ?? null,
  author: {
    name: process.env.REACT_APP_AUTHOR_NAME ?? null,
    url: process.env.REACT_APP_AUTHOR_URL ?? null,
  },
  api: {
    url: process.env.REACT_APP_API_URL ?? null,
  },
};
