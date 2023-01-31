/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import AppContext from '../context/AppContext';
import { getItemLocalStorage, setItemLocalStorage } from '../utils/LocalStorageUtil';

export default function Cart() {
  const { open,
    setOpen,
    orderData,
    setOrderData,
    cart,
    totalPrice,
    setCart,
  } = useContext(AppContext);

  const minusOne = -1;

  useEffect(() => {
    const cartList = getItemLocalStorage('cart');
    setOrderData(cartList);
    if (totalPrice === 0) {
      setOpen(false);
    }
  }, [cart, setOpen, setOrderData, totalPrice]);

  const removeItem = (id) => {
    const newOrderData = orderData.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newOrderData));
    setCart(newOrderData);
  };

  const handleRemove = (drink) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === drink.id);
    if (index !== minusOne) {
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      } else {
        newCart[index].quantity = 0;
      }
      setCart(newCart);
      if (newCart[index].quantity === 0) {
        newCart.splice(index, 1);
      }
      setItemLocalStorage('cart', newCart);
    }
  };

  const handleAdd = (drink) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === drink.id);
    if (index !== minusOne) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...drink, quantity: 1 });
    }
    setCart(newCart);
    setItemLocalStorage('cart', newCart);
  };

  return (
    <Transition.Root show={ open } as={ Fragment }>
      <Dialog as="div" className="relative z-10" onClose={ setOpen }>
        <Transition.Child
          as={ Fragment }
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="pointer-events-none
            fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
              <Transition.Child
                as={ Fragment }
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div
                    className="flex h-full flex-col
                  overflow-y-scroll bg-white shadow-xl"
                  >
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={ () => setOpen(false) }
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {(orderData) && orderData.map((product) => (
                              <li key={ product.id } className="flex py-6">
                                <div
                                  className="h-24 w-24 flex-shrink-0
                                overflow-hidden rounded-md border border-gray-200"
                                >
                                  <img
                                    src={ product.url_image }
                                    alt={ product.imageAlt }
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="m-4 flex flex-1 flex-col">
                                  <div>
                                    <div
                                      className="flex justify-between
                                    text-base font-medium text-gray-900"
                                    >
                                      <h3>
                                        <a href={ product.href }>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">
                                        {`${product.price.replace('.', ',')}`}
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    className="flex flex-1
                                  items-end justify-between text-sm"
                                  >
                                    <p className="text-gray-500">
                                      {`Quantity: ${product.quantity} ` }
                                    </p>

                                    <button
                                      type="button"
                                      onClick={ () => handleRemove(product) }
                                    >
                                      <AiOutlineMinus />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={ () => handleAdd(product) }
                                    >
                                      <AiOutlinePlus />
                                    </button>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-green-main"
                                        onClick={ () => removeItem(product.id) }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div
                        className="flex justify-between
                      text-base font-medium text-gray-900"
                      >
                        <p>Subtotal</p>
                        <p>
                          {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="/customer/checkout"
                          className="flex items-center
                          justify-center rounded-md border
                          border-transparent bg-green-main
                          px-6 py-3 text-base font-medium
                           text-white shadow-sm"
                        >
                          Checkout
                        </a>
                      </div>
                      <div
                        className="mt-6 flex justify-center text-center
                        text-sm text-gray-500"
                      >
                        <p>
                          or
                          {' '}
                          <button
                            type="button"
                            className="font-medium text-green-main"
                            onClick={ () => setOpen(false) }
                          >

                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
