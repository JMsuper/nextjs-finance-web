import { isNumber, isObject, isString } from 'lodash';

export const formatDate = (date: string) => {
  if (!date) return '';

  const dateObj = new Date(date);
  return dateObj.toLocaleString();
};

export enum CurrencyScaleOption {
  Thousand = 'thousand',
  Million = 'million',
  None = 'none',
}

export const convertNumberScaleWithCurrency = (
  value: number,
  option: CurrencyScaleOption,
) => {
  if (value === 0) {
    return '-';
  }

  switch (option) {
    case CurrencyScaleOption.None:
      return `${Math.floor(value).toLocaleString()} 원`;
    case CurrencyScaleOption.Thousand:
      return `${Math.floor(value / 1000).toLocaleString()} 천원`;
    case CurrencyScaleOption.Million:
      return `${Math.floor(value / 1000000).toLocaleString()} 백만원`;
    default:
      return '';
  }
};

export const convertRiseAndFall = (value: number) => {
  if (value === 0) {
    return value.toLocaleString();
  }

  if (value > 0) {
    return `▲ ${value.toLocaleString()}`;
  } else {
    value = value * -1;
    return `▼ ${value.toLocaleString()}`;
  }
};
