import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import locale_ru from 'dayjs/locale/ru';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.locale('ru');

export const formatDate = (d) => {
  return dayjs(d).format('DD.MM.YY HH:mm');
};

export const dateToDDMMMM = (d) => {
  return dayjs(d, 'YYYY-MM-DD', true).format('DD MMMM');
};

const pad = (v, size = 2) => {
  let s = String(v);
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

export const secondsToStamp = (sec) => {
  const minutes = pad(Math.floor(sec / 60));
  const seconds = pad(sec % 60);

  return `${minutes}:${seconds}`;
};
