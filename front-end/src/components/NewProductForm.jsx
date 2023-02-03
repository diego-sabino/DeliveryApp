import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

import {
  statusCreated,
  timeOut } from '../utils/LoginUtil';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

export default function NewProductForm() {
  const { toggle, setToggle } = useContext(AppContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [authorization, setAuthorization] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const user = getItemLocalStorage('user');
    setToken(user.token);
  }, []);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    switch (id) {
    case 'name-product':
      setName(value);
      break;
    case 'price-product':
      setPrice(value);
      break;
    case 'image-product':
      setImage(value);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    if (name && price && image) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, price, image]);

  function Reset() {
    setName('');
    setPrice('');
    setImage('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/admin/products', {
      name,
      price,
      url_image: image,
      imageAlt: name,
    }, {
      headers: { Authorization: token },
    })
      .then((response) => {
        if (response.status === statusCreated) {
          setToggle(!toggle);
          setAuthorization(true);
          Reset();
        }
      })
      .catch((error) => {
        setAuthorization(false);
        Reset();
        setTimeout(() => {
          setAuthorization(null);
        }, timeOut);
        console.log(error.message);
      });
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex flex-col gap-4"
    >
      <label
        htmlFor="name-product"
        className="flex flex-col"
      >
        Título
        <input
          type="text"
          id="name-product"
          value={ name }
          placeholder="Título do produto"
          onChange={ handleChange }
          className="border-b-[1px] border-slate-400
            py-2 bg-transparent text-black text-lg focus:outline-none"
        />
      </label>

      <label
        htmlFor="price-product"
        className="flex flex-col"
      >
        Preço
        <input
          type="number"
          id="price-product"
          value={ price }
          placeholder="Ex.: 2,00"
          onChange={ handleChange }
          className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none"
        />
      </label>

      <label
        htmlFor="image-product"
        className="flex flex-col"
      >
        Imagem
        <input
          type="text"
          id="image-product"
          value={ image }
          placeholder="URL da imagem"
          onChange={ handleChange }
          className="border-b-[1px] border-slate-400
            py-2 bg-transparent text-black text-lg focus:outline-none"
        />
      </label>

      <button
        type="submit"
        data-testid="admin_manage__button-register"
        className="bg-green-main h-[40px]
        rounded-xl uppercase text-white text-sm disabled:bg-gray-400 mt-4"
        disabled={ isDisabled }
      >
        Registrar
      </button>

      {(authorization === null || authorization === true) ? null : (
        <div
          id="toast-bottom-right"
          className="flex absolute opc motion-reduce:transition-none
           motion-reduce:hover:transform-none right-5 bottom-5 items-center
           p-4 space-x-4 w-full max-w-xs rounded-lg  shadow
         text-gray-400 divide-gray-700 space-x bg-gray-800"
          role="alert"
          data-testid="admin_manage__element-invalid-register"
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
          <div className="ml-3 text-sm font-normal">Usuário já existente</div>
        </div>
      )}
    </form>
  );
}
