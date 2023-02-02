import mastercard from '../images/mastercard.png';
import visa from '../images/visa.png';
import logo from '../images/logo.png';

const four = 4;

export const getLogoCard = (number) => {
  if (number[0] === '4') {
    return visa;
  } if (number[0] === '5') {
    return mastercard;
  }
  return logo;
};

export const addSpaces = (str) => {
  let result = '';
  for (let i = 0; i < str.length; i += 1) {
    result += str[i];
    if ((i + 1) % four === 0) {
      result += ' ';
    }
  }
  return result;
};

export const addBar = (str) => `${str.slice(0, 2)}/${str.slice(2)}`;
