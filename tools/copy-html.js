/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import cp from 'glob-copy';

export default () => new Promise((resolve, reject) => {
  console.log('copy html');
  cp('src/*.html', 'build/', err => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
  cp('src/*.png', 'build/', err => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});
