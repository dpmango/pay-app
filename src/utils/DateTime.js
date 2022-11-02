import dayjs from 'dayjs';

export const formatDate = (d) => {
  return dayjs(d).format('DD.MM.YY HH:mm');
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
