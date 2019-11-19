export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      allComics: '/comics',
      someComics: '/comics/:start/:end',
      oneComics: '/comics/:isbn',
      addComics: '/comics/',
      putComics: '/comics/:isbn',
      delComics: '/comics/:isbn',
    }
  }
};
