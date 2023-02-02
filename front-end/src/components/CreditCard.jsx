/* eslint-disable react/jsx-max-depth */
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { addBar, addSpaces, getLogoCard } from '../utils/CardUtil';

export default function CreditCard() {
  const { setCardNumbert, payment } = useContext(AppContext);

  const [numberCreditCard, setNumberCreditCard] = useState('');
  const [nameCreditCard, setNameCreditCard] = useState('');
  const [dateCreditCard, setDateCreditCard] = useState('');
  const [cvvCreditCard, setCvvCreditCard] = useState('');
  const [backgroudImage, setBackgroudImage] = useState('');
  const [flag, setFlag] = useState('');

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

  const handleSave = () => {
    setCardNumbert(numberCreditCard);
  };

  useEffect(() => {
    if (payment === 'debit-card') {
      setBackgroudImage('https://i.imgur.com/kGkSg1v.png');
    } else if (payment === 'credit-card') {
      setBackgroudImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjG98Q2yyCB2J6o3mhW5RpyVNyJAJa7nl2JkoRJ72lfS02suuiIBe84e_Q62xoOhs_7w&usqp=CAU');
    }
  }, [payment]);

  useEffect(() => {
    const logo = getLogoCard(numberCreditCard);
    setFlag(logo);
  }, [numberCreditCard]);

  return (
    <div className="m-auto flex flex-col gap-4">
      <div
        className="w-80 h-48 bg-red-100
    rounded-xl relative text-white shadow-2xl
     transition-transform transform hover:scale-110 self-center"
      >

        <img
          className="relative object-cover w-full h-full rounded-xl"
          alt="asa"
          src={ backgroudImage }
        />

        <div className="w-full px-8 absolute top-4">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light">
                Name
              </p>
              {(nameCreditCard)
                ? (
                  <p className="font-medium tracking-widest">
                    {nameCreditCard}
                  </p>)
                : (
                  <p className="font-thin text-slate-400">
                    Ex.: Matia Antônia
                  </p>
                )}
            </div>
            <img className="w-14 h-12 object-contain" alt="flag" src={ flag } />
          </div>
          <div className="pt-1">
            <p className="font-light">
              Card Number
            </p>
            <p className="font-medium tracking-more-wider">
              {(numberCreditCard)
                ? (
                  <p className="font-medium tracking-widest">
                    {addSpaces(numberCreditCard)}
                  </p>)
                : (
                  <p className="font-thin text-slate-400">
                    Ex.: 4444 4444 4444 4444
                  </p>
                )}
            </p>
          </div>
          <div className="pt-4 pr-6">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light text-xs">
                  Valid
                </p>
                <p className="font-medium tracking-wider text-sm">
                  {(dateCreditCard)
                    ? (
                      <p className="font-medium tracking-widest">
                        { addBar(dateCreditCard) }
                      </p>)
                    : (
                      <p className="font-thin text-slate-400">
                        Ex.: 10/28
                      </p>
                    )}
                </p>
              </div>

              <div className="">
                <p className="font-light text-xs">
                  CVV
                </p>
                <p className="font-bold tracking-more-wider text-sm">
                  {(cvvCreditCard)
                    ? (
                      <p className="font-medium tracking-widest">
                        {cvvCreditCard}
                      </p>)
                    : (
                      <p className="font-thin text-slate-400">
                        Ex.: 531
                      </p>
                    )}
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
          Nome no cartão
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
          Número do cartão
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
          Data de validade
          <input
            type="text"
            id="dateCreditCard"
            maxLength={ 4 }
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
          Salve as informações deste cartão
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
