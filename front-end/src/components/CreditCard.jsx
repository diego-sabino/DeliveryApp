/* eslint-disable react/jsx-max-depth */
import React, { useState, useContext } from 'react';

import AppContext from '../context/AppContext';

export default function CreditCard() {
  const { setCardNumbert } = useContext(AppContext);

  const [numberCreditCard, setNumberCreditCard] = useState('');
  const [nameCreditCard, setNameCreditCard] = useState('');
  const [dateCreditCard, setDateCreditCard] = useState('');
  const [cvvCreditCard, setCvvCreditCard] = useState('');

  const four = 4;

  const handleChange = ({ target }) => {
    const { id, value } = target;
    switch (id) {
    case 'numberCreditCard':
      setNumberCreditCard(value);
      break;
    case 'nameCreditCard':
      setNameCreditCard(value);
      break;
    case 'dateCreditCard':
      setDateCreditCard(value);
      break;
    case 'cvvCreditCard':
      setCvvCreditCard(value);
      break;
    case 'option':
      setOption(value);
      break;
    default:
      break;
    }
  };

  function addSpaces(str) {
    let result = '';
    for (let i = 0; i < str.length; i += 1) {
      result += str[i];
      if ((i + 1) % four === 0) {
        result += ' ';
      }
    }
    return result;
  }

  const handleSave = () => {
    setCardNumbert(numberCreditCard);
  };

  return (
    <div className="m-auto flex flex-col gap-4">
      <div
        className="w-80 h-48 bg-red-100
    rounded-xl relative text-white shadow-2xl
     transition-transform transform hover:scale-110 self-center"
      >

        <img className="relative object-cover w-full h-full rounded-xl" alt="asa" src="https://i.pinimg.com/236x/9e/7c/82/9e7c82aa4318ae7a0784993765f4dd19.jpg" />

        <div className="w-full px-8 absolute top-4">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light">
                Name
              </p>
              <p className="font-medium tracking-widest">
                {nameCreditCard}
              </p>
            </div>
            <img className="w-14 h-14" alt="dada" src="https://i.imgur.com/bbPHJVe.png" />
          </div>
          <div className="pt-1">
            <p className="font-light">
              Card Number
            </p>
            <p className="font-medium tracking-more-wider">
              { addSpaces(numberCreditCard) }
            </p>
          </div>
          <div className="pt-4 pr-6">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light text-xs">
                  Valid
                </p>
                <p className="font-medium tracking-wider text-sm">
                  { dateCreditCard }
                </p>
              </div>

              <div className="">
                <p className="font-light text-xs">
                  CVV
                </p>
                <p className="font-bold tracking-more-wider text-sm">
                  { cvvCreditCard}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <form className="flex flex-col gap-3">
        <label
          htmlFor="nameCreditCard"
          className="flex flex-col text-sm text-gray-500"
        >
          Name on card
          <input
            type="text"
            id="nameCreditCard"
            value={ nameCreditCard }
            onChange={ handleChange }
            className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg w-full focus:outline-none "
          />
        </label>

        <label
          htmlFor="numberCreditCard"
          className="flex flex-col text-sm text-gray-500"
        >
          Card number
          <input
            type="text"
            id="numberCreditCard"
            maxLength="16"
            onChange={ handleChange }
            className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none "
          />
        </label>

        <label
          htmlFor="dateCreditCard"
          className="flex flex-col text-sm text-gray-500"
        >
          Expiration date
          <input
            type="text"
            id="dateCreditCard"
            onChange={ handleChange }
            className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none"
          />
        </label>

        <label
          htmlFor="cvvCreditCard"
          className="flex flex-col text-sm text-gray-500"
        >
          CVV
          <input
            type="text"
            id="cvvCreditCard"
            maxLength="3"
            onChange={ handleChange }
            className="border-b-[1px] border-slate-400
             py-2 bg-transparent text-black text-lg focus:outline-none "
          />
        </label>

        <label
          htmlFor="save-card"
          className="flex text-sm text-gray-500 items-center gap-2"
        >
          Save your card information
          <input
            type="checkbox"
            required
            id="save-card"
            onChange={ handleSave }
            className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none "
          />
        </label>
      </form>
    </div>

  );
}
