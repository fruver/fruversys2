import url from 'url';
import path from 'path';

const getStatic = (resourcePath) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  let indexPath;
  if (isDevelopment) {
    indexPath = url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: process.env.ELECTRON_WEBPACK_WDS_PORT,
      pathname: resourcePath,
      slashes: true
    });
  } else {
    indexPath = path.resolve(global.__static, resourcePath);
  }

  return indexPath;
};



export default getStatic;