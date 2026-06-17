export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  },

  clear() {
    localStorage.removeItem('accessToken');
  },
};