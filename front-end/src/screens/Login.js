import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { statusOk, timeOut, minCharacterPassword, emailRegex } from '../utils/LoginUtil';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [authorized, setAuthorized] = useState(null);

  const validEmail = emailRegex.test(email);
  const validPassword = password.length >= minCharacterPassword;

  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (validEmail && validPassword) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [email, password, validEmail, validPassword]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {
      email,
      password,
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === statusOk) {
          navigate('/customer/products');
          setAuthorized(true);
        }
      })
      .catch((error) => {
        setAuthorized(false);
        setTimeout(() => {
          setAuthorized(null);
        }, timeOut);
        console.log(error.message);
      });
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <h1
        className="text-[30px] font-thin uppercase"
      >
        Login
      </h1>

      <form
        className="space-y-4"
        onSubmit={ handleSubmit }
      >
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ handleChange }
          id="email"
          className="
            border sm:text-sm rounded-lg
            block p-2.5 w-[328px] border-[#BFBFBF]
            focus:ring-blue-500 h-[48px]
            focus:border-blue-500"
          placeholder="E-mail"
          required
          data-testid="common_login__input-email"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={ password }
          onChange={ handleChange }
          className="border border-[#BFBFBF]
            sm:text-sm rounded-lg h-[48px]
            block w-full p-2.5
            focus:ring-blue-500
            focus:border-blue-500"
          required
          data-testid="common_login__input-password"
        />

        <div className="flex items-center justify-center">
          <button
            disabled={ disableBtn }
            type="submit"
            data-testid="common_login__button-login"
            className="w-[221px] h-[43px] text-white
            bg-[#00a3ffcc]
            focus:ring-4 focus:outline-none
            drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]uppercase
            font-thin disabled:bg-gray-400
            disabled:cursor-not-allowed
            focus:ring-primary-300 rounded-[15px] text-base
            px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center font-light text-gray-400">
          Don&apos;t have an account yet?
          <button
            type="button"
            onClick={ () => navigate('/register') }
            className="font-medium hover:underline text-[#00a3ffcc] ml-2"
            data-testid="common_login__button-register"
          >
            Sign up
          </button>
        </p>
      </form>

      {(authorized === null || authorized === true) ? null : (
        <div
          data-testid="common_login__element-invalid-email"
          id="toast-bottom-right"
          className="flex absolute opc motion-reduce:transition-none
           motion-reduce:hover:transform-none right-5 bottom-5 items-center
           p-4 space-x-4 w-full max-w-xs rounded-lg  shadow
         text-gray-400 divide-gray-700 space-x bg-gray-800"
          role="alert"
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
          <div className="ml-3 text-sm font-normal">Usuário e/ou senha inválido(s)</div>
        </div>
      )}
    </section>
  );
}
