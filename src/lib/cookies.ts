import Cookies from 'universal-cookie';

const cookies = new Cookies();
// !important: rename this file to cookies.ts
export const getToken = (): string => {
  return cookies.get('@sea/token');
};

export const setToken = (token: string) => {
  cookies.set('@sea/token', token, {
    path: '/',
  });
};

export const removeToken = () => {
  cookies.remove('@sea/token', {
    path: '/',
  });
};
