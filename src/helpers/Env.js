export const getEnv = (val) => {
  // window.REACT_ENV[val];
  return process.env[val];
};
