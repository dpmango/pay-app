export const withVersion = (params) => {
  return {
    params: {
      apiVersion: 1,
      ...params,
    },
  };
};
