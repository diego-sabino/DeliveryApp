import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import NavbarAdm from '../components/NavbarAdm';
import NewProductForm from '../components/NewProductForm';
import ProductsTable from '../components/ProductsTable';
import AppContext from '../context/AppContext';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

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

  const removeProduct = (productId) => {
    const user = getItemLocalStorage('user');
    axios.delete(`http://localhost:3001/admin/products/${productId}`, {
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

      <div className="flex px-4 justify-center mb-4">
        <button
          type="button"
          className={ `p-2 w-40 rounded-l-lg
           ${(component === 0) ? 'bg-green-main text-white' : 'bg-gray-300'}` }
          onClick={ () => setComponenet(0) }
        >
          Produtos

        </button>

        <button
          type="button"
          className={ `p-2 w-40 rounded-r-lg 
          ${(component === 1) ? 'bg-green-main text-white' : 'bg-gray-300'}` }
          onClick={ () => setComponenet(1) }
        >
          Registrar produto

        </button>
      </div>

      <main className="px-4">
        {
          (component === 0)
            ? (
              <section>
                <p className="py-2 text-xl font-bold">Lista de produtos</p>
                <ProductsTable
                  products={ productsList }
                  removeProduct={ removeProduct }
                />
              </section>)
            : (
              <section>
                <p className="py-2 text-xl font-bold">Registrar novo produto</p>
                <NewProductForm />
              </section>
            )
        }
      </main>
    </div>
  );
}
