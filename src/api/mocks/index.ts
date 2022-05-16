// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw';

import { handlers } from '@app/api/mocks/handler';

const worker = setupWorker(...handlers);

export default worker;
