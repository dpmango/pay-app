import dayjs from 'dayjs';

export const formatDate = (d) => {
  return dayjs(d).format('DD.MM.YY HH:mm');
};
