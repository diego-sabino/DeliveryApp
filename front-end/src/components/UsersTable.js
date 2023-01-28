import PropTypes from 'prop-types';
import { AiOutlineDelete } from 'react-icons/ai';
import usersProperties from '../mocks/UsersTableProperties';

export default function UsersTable({ users, removeUser }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#036B52] text-white">
          { usersProperties.map((item, index) => (
            <th
              key={ index }
              className="px-4 py-2 text-lg font-medium"
            >
              {item}

            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(users) && users.map((user, index) => (
          <tr key={ index } className="border-b">
            <td
              className="px-4 py-2 text-center"
              data-testid={
                `admin_manage__element-user-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>

            <td
              className="px-4 py-2 text-center"
              data-testid={
                `admin_manage__element-user-table-name-${index}`
              }
            >
              {user.name}
            </td>

            <td
              className="px-4 py-2 text-center"
              data-testid={
                `admin_manage__element-user-table-email-${index}`
              }
            >
              {user.email}
            </td>

            <td
              className="px-4 py-2 text-center"
              data-testid={
                `admin_manage__element-user-table-role-${index}`
              }
            >
              {user.role}
            </td>

            <td className="px-4 py-2 text-center">
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
