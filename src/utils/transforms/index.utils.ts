import { AnyObjectType } from '@typings/app/index.types';

const isArray = (obj: AnyObjectType) => Array.isArray(obj);

const isObject = (obj: AnyObjectType) => obj === Object(obj) && !isArray(obj) && typeof obj !== 'function';

const checkInput = (input?: string | number) => {
  return input && typeof input === 'string' ? true : false;
};

const toSnakeCase = (input: string | number) => {
  const checkedInput = checkInput(input);
  if (!checkedInput) {
    return input;
  }

  const str = input as string;
  const array = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
  if (array) {
    return array.map(x => x.toLowerCase()).join('_');
  }
  return str;
};

const toCamelCase = (input: string | number) => {
  const checkedInput = checkInput(input);
  if (!checkedInput) {
    return input;
  }

  let str = input as string;
  str = str.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  return str.substring(0, 1).toLowerCase() + str.substring(1);
};

export const objKeyToSnakeCase = (obj: AnyObjectType) => {
  if (isObject(obj)) {
    const o: AnyObjectType = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (isObject(element)) {
          o[toSnakeCase(key)] = objKeyToCamelCase(element);
        } else {
          o[toSnakeCase(key)] = element;
        }
      }
    }

    return o;
  }

  return obj;
};

export const objKeyToCamelCase = (obj: AnyObjectType) => {
  if (isObject(obj)) {
    const o: AnyObjectType = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (isObject(element)) {
          o[toCamelCase(key)] = objKeyToSnakeCase(element);
        } else {
          o[toCamelCase(key)] = element;
        }
      }
    }

    return o;
  }

  return obj;
};

export const setQuery = (payload: AnyObjectType) => {
  let str = '';

  if (Object.entries(payload).length === 0) {
    return str;
  }

  str += '?';

  for (const key in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      const element = payload[key];
      str += `${key}=${element}`;
    }
  }

  return str;
};
