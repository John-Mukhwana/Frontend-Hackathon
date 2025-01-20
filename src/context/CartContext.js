import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

const useCart = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (event) => {
        const existingItem = get().cartItems.find((item) => item.eventId === event.eventId);
        if (!existingItem) {
          set((state) => ({
            cartItems: [...state.cartItems, event],
          }));
          toast.success(`${event.title} added to cart!`, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.info(`${event.title} is already in the cart.`, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      },
      removeFromCart: (eventId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.eventId !== eventId),
        }));
        toast.info('Item removed from cart.', {
          position: 'top-right',
          autoClose: 3000,
        });
      },
      clearCart: () => {
        set({ cartItems: [] });
        toast.info('Cart cleared.', {
          position: 'top-right',
          autoClose: 3000,
        });
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage
    }
  )
);

export { useCart };