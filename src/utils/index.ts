export const isAuthen = () => {
  return !!localStorage.getItem('access_token');
};
