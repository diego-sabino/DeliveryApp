/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import { AiOutlineDelete } from 'react-icons/ai';
import usersProperties from '../mocks/UsersTableProperties';

export default function UsersTable({ users, removeUser }) {
  return (
    <div className="rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            { usersProperties.map((item, index) => (
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
          {(users) && users.map((user, index) => (
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
                {user.name}
              </td>

              <td
                className="text-sm text-gray-900 font-light
                        px-6 py-4 whitespace-nowrap"
                data-testid={
                  `admin_manage__element-user-table-email-${index}`
                }
              >
                {user.email}
              </td>

              <td
                className="text-sm text-gray-900 font-light
                        px-6 py-4 whitespace-nowrap"
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {user.role}
              </td>

              <td
                className="text-sm text-gray-900 font-light
                      px-6 py-4 whitespace-nowrap"
              >
                <button
                  type="button"
                  onClick={ () => removeUser(user.id) }
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

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  removeUser: PropTypes.func.isRequired,
};
