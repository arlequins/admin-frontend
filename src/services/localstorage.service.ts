import { STORAGE_KEYS } from '@app/constants/enums.constants';
import AbstractStorageService from '@app/services/abstract/AbstractStorageService';

class LocalStorageService extends AbstractStorageService {
  constructor(key: string) {
    super(key, window.localStorage);
  }
}

export const authStorage = new LocalStorageService(STORAGE_KEYS.AUTH);
