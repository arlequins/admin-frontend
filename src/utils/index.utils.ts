export const makeExpireTimestamp = (expires: number) => {
  const currentTimestamp = new Date().getTime();
  const expiresTimestamp = currentTimestamp + expires * 1000;
  return new Date(expiresTimestamp).getTime();
};
