import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { minCharacterPassword,
  emailRegex,
  minCharacterName,
  statusCreated,
  timeOut } from '../utils/LoginUtil';
import { setItemLocalStorage } from '../utils/LocalStorageUtil';

export default function Register() {
  const [nameValue, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [authorization, setAuthorization] = useState(null);

  const navigate = useNavigate();

  const validName = nameValue.length >= minCharacterName;
  const validEmail = emailRegex.test(email);
  const validPassword = password.length >= minCharacterPassword;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'name':
      setName(value);
      break;
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    if (validName && validEmail && validPassword) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [email, nameValue, password, validEmail, validName, validPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {
      email,
      name: nameValue,
      password,
      role: 'customer',
    })
      .then((response) => {
        if (response.status === statusCreated) {
          setItemLocalStorage('user', response.data);
          setAuthorization(true);
          navigate('/customer/products');
        }
      })
      .catch((error) => {
        setAuthorization(false);
        setTimeout(() => {
          setAuthorization(null);
        }, timeOut);
        console.log(error.message);
      });
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col w-[330px] gap-2 mb-5">
        <h1
          className="text-2xl font-bold"
        >
          Cadastre-se ????
        </h1>
        <p
          className="text-gray-400 text-sm"
        >
          Crie uma conta e pe??a suas bebidas favoritas

        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={ handleSubmit }
      >
        <input
          type="text"
          name="name"
          value={ nameValue }
          onChange={ handleChange }
          id="name"
          className="
            border sm:text-sm rounded-lg
            block p-2.5 w-[328px]
            border-[#BFBFBF] h-[48px]
            "
          placeholder="Nome completo"
          data-testid="common_register__input-name"
          required
        />

        <input
          type="email"
          name="email"
          value={ email }
          onChange={ handleChange }
          id="email"
          className="
            border sm:text-sm rounded-lg
            block p-2.5 w-[328px] border-[#BFBFBF] h-[48px]"
          placeholder="E-mail"
          required
          data-testid="common_register__input-email"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          value={ password }
          onChange={ handleChange }
          className="border border-[#BFBFBF]
            sm:text-sm rounded-lg h-[48px]
            block w-full p-2.5"
          required
          data-testid="common_register__input-password"
        />

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={ disableBtn }
            data-testid="common_register__button-register"
            className="w-[221px] h-[43px] text-white
            bg-green-main
            focus:ring-4 focus:outline-none
            drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]uppercase
            disabled:bg-[#ced7d3]
            disabled:text-[#ffffff]
            disabled:cursor-not-allowed
            focus:ring-primary-300 rounded-[15px] text-base
            px-5 py-2.5 text-center"
          >
            Cadastrar
          </button>
        </div>

        <p className="text-sm text-center font-light text-gray-400">
          J?? possui uma conta?
          <a
            href="/login"
            className="font-medium hover:underline text-green-main ml-2"
            data-testid="common_login__element-invalid-email"
          >
            Entre aqui
          </a>
        </p>
      </form>

      {(authorization === null || authorization === true) ? null : (
        <div
          id="toast-bottom-right"
          className="flex absolute opc motion-reduce:transition-none
           motion-reduce:hover:transform-none right-5 bottom-5 items-center
           p-4 space-x-4 w-full max-w-xs rounded-lg  shadow
         text-gray-400 divide-gray-700 space-x bg-gray-800"
          role="alert"
          data-testid="common_register__element-invalid_register"
        >
          <div
            className="inline-flex flex-shrink-0 justify-center
                items-center w-8 h-8 text-red-500 rounded-lg bg-red-800"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1
                1 0 111.414 1.414L11.414 10l4.293
                4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1
                .414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">User already registred</div>
        </div>
      )}
    </section>
  );
}
