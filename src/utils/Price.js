/* eslint-disable no-plusplus */
// 1000.00 -> 1 000.00
export const formatPrice = (num, digits) => {
  let trailingZeros = digits !== undefined ? digits : 0;

  const spacesRegex = /\B(?=(\d{3})+(?!\d))/g;
  if (num === null || num === undefined) {
    return '0.00';
  }

  if (typeof num === 'number') {
    return num.toFixed(trailingZeros).replace(spacesRegex, ' ');
  }

  if (typeof num === 'string') {
    return parseFloat(num).toFixed(trailingZeros).replace(spacesRegex, ' ');
  }

  return '';
};
