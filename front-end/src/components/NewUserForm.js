import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

import { minCharacterPassword,
  emailRegex,
  minCharacterName,
  statusCreated,
  timeOut } from '../utils/LoginUtil';
import roles from '../mocks/Roles';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

export default function NewUserForm() {
  const { toggle, setToggle } = useContext(AppContext);

  const [roleSelected, setSRoleSelected] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authorization, setAuthorization] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [token, setToken] = useState('');

  const validName = fullname.length >= minCharacterName;
  const validEmail = emailRegex.test(email);
  const validPassword = password.length >= minCharacterPassword;
  const validRole = roleSelected.length !== 0;

  useEffect(() => {
    const user = getItemLocalStorage('user');
    setToken(user.token);
  }, []);

  useEffect(() => {
    if (validName && validEmail && validPassword && validRole) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, fullname, password, roleSelected]);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    switch (id) {
    case 'fullname-manage':
      setFullname(value);
      break;
    case 'email-manage':
      setEmail(value);
      break;
    case 'password-manage':
      setPassword(value);
      break;
    default:
      break;
    }
  };

  function Reset() {
    setFullname('');
    setEmail('');
    setPassword('');
    setSRoleSelected('');
    const dropDown = document.getElementById('role-manage');
    dropDown.selectedIndex = 0;
  }

  const handleSelect = (event) => {
    setSRoleSelected(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/admin/register', {
      email,
      name: fullname,
      password,
      role: roleSelected,
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

  //   <label
  //   htmlFor="numberCreditCard"
  //   className="flex flex-col text-sm text-gray-500"
  // >
  //   Número do cartão
  //   <input
  //       type="text"
  //       id="numberCreditCard"
  //       maxLength="16"
  //       onChange={ handleChange }
  //       className="border-b-[1px] border-slate-400
  //         py-2 bg-transparent text-black text-lg focus:outline-none"
  //     />
  // </label>;

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex flex-col gap-4"
    >
      <label
        htmlFor="fullname-manage"
        className="flex flex-col"
      >
        Name
        <input
          type="text"
          id="fullname-manage"
          value={ fullname }
          placeholder="Enter your fullname"
          data-testid="admin_manage__input-name"
          onChange={ handleChange }
          className="border-b-[1px] border-slate-400
            py-2 bg-transparent text-black text-lg focus:outline-none"
        />
      </label>

      <label
        htmlFor="email-manage"
        className="flex flex-col"
      >
        E-mail
        <input
          type="email"
          id="email-manage"
          value={ email }
          placeholder="your-email@domain.com"
          data-testid="admin_manage__input-email"
          onChange={ handleChange }
          className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none"
        />
      </label>

      <label
        htmlFor="password-manage"
        className="flex flex-col"
      >
        Password
        <input
          type="text"
          id="password-manage"
          value={ password }
          placeholder="******"
          data-testid="admin_manage__input-password"
          onChange={ handleChange }
          className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none"
        />
      </label>

      <label
        htmlFor="role-manage"
        className="flex flex-col"
      >
        Role
        <select
          type="text"
          id="role-manage"
          onChange={ handleSelect }
          data-testid="admin_manage__select-role"
          className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none w-full"
          required
        >
          <option
            disabled
            defaultValue
            selected
            value="Select a role"
          >
            Select a role
          </option>
          {
            roles.map((role, index) => (
              <option
                key={ index }
                id="roleSelected"
                value={ role }
              >
                {role}
              </option>
            ))
          }
        </select>
      </label>

      <button
        type="submit"
        data-testid="admin_manage__button-register"
        className="bg-green-main h-[40px]
        rounded-xl uppercase text-white text-sm disabled:bg-gray-400"
        disabled={ isDisabled }
      >
        Register
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
          <div className="ml-3 text-sm font-normal">User already registred</div>
        </div>
      )}
    </form>
  );
}
