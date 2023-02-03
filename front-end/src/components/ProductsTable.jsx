/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import { AiOutlineDelete } from 'react-icons/ai';
import { productsProperties } from '../mocks/UsersTableProperties';

export default function ProductsTable({ products, removeProduct }) {
  return (
    <div className="rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            { productsProperties.map((item, index) => (
              <th
                key={ index }
                className="text-sm
                 bg-green-main font-medium
                  text-white px-6 py-4 uppercase align-middle"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(products) && products.map((product, index) => (
            <tr key={ index } className="bg-white border-b text-center">
              <td
                className="px-6 py-4 whitespace-nowrap
                        text-sm font-medium text-gray-900"
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap
                        text-sm font-medium text-gray-900"
                data-testid={
                  `admin_manage__element-user-table-name-${index}`
                }
              >
                {product.name}
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap
                    text-sm font-medium text-gray-900"
              >
                <img src={ product.url_image } alt="Imagem do produto" />
              </td>

              <td
                className="text-sm text-gray-900 font-light
                      px-6 py-4 whitespace-nowrap"
              >
                <button
                  type="button"
                  onClick={ () => removeProduct(product.id) }
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                  className="bg-red-500
                   text-white p-2 rounded-lg text-md font-medium"
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  removeProduct: PropTypes.func.isRequired,
};
