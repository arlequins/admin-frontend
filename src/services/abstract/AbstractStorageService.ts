import { AnyObjectType, StorageData, StorageStatus } from '@typings/app/index.types';

export default class AbstractStorageService {
  private key: string;
  private source: Storage;
  private status: StorageStatus;
  public expireSeconds?: number;
  public isActive = true;

  constructor(key: string, source: Storage, expireSeconds?: number) {
    this.key = key;
    this.source = source;
    this.status = StorageStatus.EMPTY;
    this.expireSeconds = expireSeconds;

    if (!(key && source)) {
      this.isActive = false;
      return;
    }

    this.checkItem();
  }

  private parseData = (str: string | null) => {
    if (!str) {
      return undefined;
    }
    try {
      return JSON.parse(str);
    } catch (e) {
      return undefined;
    }
  };

  private checkItem = () => {
    const fetchData = this.getItem();

    if (!fetchData) {
      this.status = StorageStatus.EMPTY;
    } else {
      this.status = StorageStatus.SET;
    }
  };

  public getItem = () => {
    const fetchStorage = this.source.getItem(this.key);
    const parseData: StorageData = this.parseData(fetchStorage);

    if (!parseData) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = parseData.data as any;

    if (parseData?.expires) {
      const currentTimestamp = new Date().getTime();
      const expiresTimestamp = parseData?.expires ?? -1;
      const isExpired = currentTimestamp > expiresTimestamp;

      if (isExpired) {
        return undefined;
      }
    }

    return data;
  };

  public setItem = (data: AnyObjectType) => {
    const storageData: StorageData = {
      data,
      expires: this.expireSeconds ? new Date().getTime() + this.expireSeconds * 1000 : undefined,
    };

    this.source.setItem(this.key, JSON.stringify(storageData));
    this.status = StorageStatus.SET;
  };

  public removeItem = () => {
    this.source.removeItem(this.key);
    this.status = StorageStatus.REMOVED;
  };

  public statusItem = () => {
    return this.status;
  };
}
