// eslint-disable-next-line no-restricted-imports
import packageJson from '../../package.json';

const env = {
  VERSION: packageJson.version ?? '',
  PROJECT_NAME: packageJson.name ?? '',
  NODE_ENV: process.env.NODE_ENV,
  API_HOST: process.env.REACT_APP_API_HOST ?? '',
  MOCK_API: process.env.REACT_APP_MOCK_API && process.env.REACT_APP_MOCK_API === 'true' ? true : false,
};

export const USE_MOCK_API = env.NODE_ENV === 'development' && env.MOCK_API;

export default env;
