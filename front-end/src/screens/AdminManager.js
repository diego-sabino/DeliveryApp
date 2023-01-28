import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import NavbarAdm from '../components/NavbarAdm';
import NewUserForm from '../components/NewUserForm';
import UsersTable from '../components/UsersTable';
import AppContext from '../context/AppContext';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

export default function AdminManager() {
  const { toggle, setToggle } = useContext(AppContext);
  const [usersList, setUsersList] = useState([]);

  console.log(usersList);

  useEffect(() => {
    let users = [];
    axios.get('http://localhost:3001/users')
      .then((response) => {
        users = response.data;
        setUsersList(users.filter((user) => user.role !== 'administrator'));
      }).catch((error) => {
        console.log(error);
      });
  }, [toggle]);

  const removeUser = (userId) => {
    const user = getItemLocalStorage('user');
    axios.delete(`http://localhost:3001/user/${userId}`, {
      headers: { Authorization: user.token },
    })
      .then((response) => {
        console.log(response);
        setToggle(!toggle);
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavbarAdm />

      <main className="p-6">
        <section>
          <p className="py-2 text-xl font-bold">Register new user</p>
          <NewUserForm />
        </section>

        <section className="pt-6">
          <p className="py-2 text-xl font-bold">Users List</p>
          <UsersTable users={ usersList } removeUser={ removeUser } />
        </section>
      </main>
    </div>
  );
}
