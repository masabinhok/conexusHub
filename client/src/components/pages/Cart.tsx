import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ICart } from '../../vite-env';

const BACKEND_URL = 'http://localhost:3000';

const Cart = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/cart/${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(response.data.cart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetch is done
      }
    };

    fetchCart();
  }, [token, user?._id]);

  if (loading) {
    return <h1 className='text-center text-lg'>Loading...</h1>;
  }

  return (
    <div className='container mx-auto p-6 bg-gray-50 rounded-lg shadow-md'>
      {cart ? (
        <div>
          <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>
            Your Cart
          </h1>
          <ul className='space-y-4'>
            {cart.items.map((item) => (
              <li
                key={item.product?._id}
                className='flex p-4 border rounded-lg bg-white shadow hover:shadow-lg transition-shadow duration-200'
              >
                <img
                  className='w-24 h-24 object-cover rounded-md mr-4'
                  src={item.product?.productImageURL}
                  alt={item.product?.productName}
                />
                <div className='flex-grow'>
                  <p className='text-lg font-semibold text-gray-700'>
                    {item.product?.productName}
                  </p>
                  <p className='text-gray-600'>Quantity: {item.quantity}</p>
                  <p className='text-gray-600'>
                    Price/{item.product?.unit}:{' '}
                    <span className='font-medium'>Rs. {item.product.price}</span>
                  </p>
                  <p className='text-gray-600'>
                    Total Price:{' '}
                    <span className='font-medium'>
                      Rs. {item.product?.price * item.quantity}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className='mt-6 text-right'>
            <h3 className='text-xl font-bold text-gray-800'>
              Total Amount:{' '}
              <span className='text-blue-600'>Rs. {cart.totalAmount}</span>
            </h3>
          </div>
        </div>
      ) : (
        <h1 className='text-center text-lg'>Your cart is empty.</h1>
      )}
    </div>
  );
};

export default Cart;
