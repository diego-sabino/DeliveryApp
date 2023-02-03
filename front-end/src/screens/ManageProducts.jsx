import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import NavbarAdm from '../components/NavbarAdm';
import NewUserForm from '../components/NewUserForm';
import UsersTable from '../components/UsersTable';
import AppContext from '../context/AppContext';

export default function ManageProducts() {
  const { toggle, setToggle } = useContext(AppContext);
  const [productsList, setProductsList] = useState([]);
  const [component, setComponenet] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/customer/products')
      .then((response) => {
        setProductsList(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [toggle]);

//   const removeProduct = (userId) => {
//     const user = getItemLocalStorage('user');
//     axios.delete(`http://localhost:3001/user/${userId}`, {
//       headers: { Authorization: user.token },
//     })
//       .then((response) => {
//         console.log(response);
//         setToggle(!toggle);
//       }).catch((error) => {
//         console.log(error);
//       });
//   };

  return (
    <div>
      <NavbarAdm />

      <div className="flex px-4 justify-center mb-4">
        <button
          type="button"
          className={ `p-2 w-40 rounded-l-lg
           ${(component === 0) ? 'bg-green-main text-white' : 'bg-gray-300'}` }
          onClick={ () => setComponenet(0) }
        >
          Usuários

        </button>

        <button
          type="button"
          className={ `p-2 w-40 rounded-r-lg 
          ${(component === 1) ? 'bg-green-main text-white' : 'bg-gray-300'}` }
          onClick={ () => setComponenet(1) }
        >
          Registrar usuário

        </button>
      </div>

      <main className="px-4">
        {
          (component === 0)
            ? (
              <section>
                <p className="py-2 text-xl font-bold">Users List</p>
                <UsersTable users={ usersList } removeUser={ removeUser } />
              </section>)
            : (
              <section>
                <p className="py-2 text-xl font-bold">Registrar novo usuárior</p>
                <NewUserForm />
              </section>
            )
        }
      </main>
    </div>
  );
}

