// import Cookies from 'js-cookie';

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('access_token');

  return token;
};

export const clearAuthSession = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
//   Cookies.remove('token');
};

export const saveAuthToken = (token: string) => {
  localStorage.setItem('access_token', token);
//   Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
}