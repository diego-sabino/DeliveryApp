// import PropTypes from 'prop-types';
// import tableProprieties from '../utils/TableProprieties';

// export default function TableCheckout({ orderData }) {
//   const removeItem = (id) => {
//     const newOrderData = orderData.filter((item) => item.id !== id);
//     localStorage.setItem('cart', JSON.stringify(newOrderData));
//     window.location.reload();
//   };

//   return (
//     <table
//       className="table-auto mx-auto text-center
//       md:text-center bg-gray-100 shadow-lg md:w-4/5 w-full"
//     >
//       <thead>
//         <tr className="bg-teal-500 text-white">
//           {
//             tableProprieties.map((item, index) => (
//               <th
//                 key={ index }
//                 className="px-4 py-2 md:px-6 md:py-3 text-lg font-medium"
//               >
//                 {item}

//               </th>
//             ))
//           }
//         </tr>
//       </thead>
//       <tbody>
//         {orderData.map((item) => (
//           <tr key={ item.id } className="border-b">
//             <td className="px-4 py-2 md:px-6 md:py-3 text-md font-medium">{item.name}</td>
//             <td
//               className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
//             >
//               {item.description}

//             </td>
//             <td
//               className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
//             >
//               {item.quantity}

//             </td>
//             <td
//               className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
//             >
//               {item.unitPrice}

//             </td>
//             <td
//               className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
//             >
//               {item.subtotal}

//             </td>
//             <td className="px-4 py-2 md:px-6 md:py-3">
//               <button
//                 type="button"
//                 onClick={ () => removeItem(item.id) }
//                 className="bg-red-500
//                  text-white p-2 rounded-lg md:py-2 md:px-4 text-md font-medium"
//               >
//                 Remover
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// TableCheckout.propTypes = {
//   orderData: PropTypes.arrayOf(PropTypes.object).isRequired,
// };
