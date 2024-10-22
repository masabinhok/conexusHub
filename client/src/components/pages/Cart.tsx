import axios from 'axios';
import Authorization from '../Authorization';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ICart } from '../../vite-env';
import { Link } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3000';

const Cart = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [address, setAddress] = useState(user?.address);
  const [cart, setCart] = useState<ICart | undefined>(undefined);

  const handleRemove = async ({
    productId,
    productPrice,
    productQuantity,
  }: {
    productId: string;
    productPrice: number;
    productQuantity: number;
  }) => {
    try {
      await axios.post(`${BACKEND_URL}/api/cart/${user?._id}/remove`, {
        productId: productId,
        productPrice,
        productQuantity,
      });
      const res = await axios.get(`${BACKEND_URL}/api/cart/${user?._id}`);
      console.log(res.data.cart);
      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/cart/${user?._id}`
          );
          setCart(response.data.cart);
          console.log('Cart:', response.data.cart);
        } catch (error) {
          console.error('Error fetching user cart:', error);
        }
      };
      fetchData();
    }
  }, [user?._id]);

  return (
    <div className='min-h-screen bg-background text-text flex flex-col items-center py-10 px-5'>
      <Authorization />
      <div className='max-w-[1200px] w-full'>
        <h1 className='text-3xl text-primary font-bold mb-8 text-center'>
          Your Shopping Cart
        </h1>

        <div className='flex  gap-8 flex-col md:flex-row'>
          {/* Cart Items */}
          {!cart?.items?.length ? (
            <div className='w-full flex-1 bg-white shadow-md rounded-lg p-6 text-center'>
              <p className='text-xl font-semibold'>Your cart is empty</p>
              <p className='text-accent mt-2'>
                <Link to='/explore-marketplace'>
                  <span className='text-primary hover:underline cursor-pointer'>
                    Add items
                  </span>
                </Link>{' '}
                to your cart to see them here
              </p>
            </div>
          ) : (
            <div className='flex-1 space-y-6'>
              {cart?.items?.map((item) => (
                <div
                  key={item.product._id}
                  className='flex gap-5 p-5 bg-white shadow-md rounded-lg items-center hover:shadow-lg transition-shadow duration-300 max-md:flex-col'
                >
                  <img
                    src={item.product.productImageURL}
                    alt={item.product.productName}
                    className='w-40 h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
                  />
                  <div className='flex-1 space-y-2 text-center md:text-left'>
                    <p className='font-semibold text-xl'>
                      {item.product.productName}
                    </p>
                    <p className='text-accent text-lg'>
                      Rs. {item.product.price} / {item.product.unit}
                    </p>
                    <p className='text-sm text-accent'>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleRemove({
                        productId: item.product._id,

                        productPrice: item.product.price,
                        productQuantity: item.quantity,
                      })
                    }
                    className='bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200'
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Order Summary */}
          <div className='w-full md:w-[350px] h-fit bg-white shadow-md rounded-lg p-6 space-y-6'>
            <label className='p-2 font-bold' htmlFor='address'>
              Shipping Address
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='w-full font-normal mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Shipping Address'
              />
            </label>

            <div className='border-t pt-4 space-y-2'>
              <h2 className='text-xl font-semibold'>Order Summary</h2>
              <p className='text-sm'>
                Subtotal ({cart?.totalQuantity} items):{' '}
                <span className='font-semibold'>Rs. {cart?.totalAmount}</span>
              </p>
              <p className='text-sm'>Shipping fee: Free</p>
            </div>
            <div className='space-y-3'>
              <input
                type='text'
                placeholder='Voucher Code'
                className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              />
              <button className='w-full bg-secondary text-white p-3 rounded-lg hover:bg-primary transition-colors duration-200'>
                Apply Voucher
              </button>
            </div>
            <div className='border-t pt-4 space-y-1'>
              <p className='text-lg font-semibold'>
                Total: Rs. {cart?.totalAmount}
              </p>
            </div>
            <button className='w-full bg-secondary text-white p-3 rounded-lg hover:bg-primary transition-colors duration-200'>
              Proceed to Checkout ({cart?.totalQuantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
