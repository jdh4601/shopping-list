import { createContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

type ShoppingCartContext = {
  cartToggle: () => void;
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

// context 전역 객체 생성
export const ShoppingCartContext = createContext({} as ShoppingCartContext); // context 객체를 생성한다.

// Provider 생성한 context를 하위 컴포넌트에게 전달
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const cartToggle = () => {
    setIsOpen(prev => !prev);
  };

  const getItemQuantity = (id: number) => {
    // cart에 아이템의 양이 null 또는 undefined이라면? -> 0 리턴
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const increaseQuantity = (id: number) => {
    setCartItems(currItems => {
      // item 존재하지 않을 때
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        // item 존재할 때
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(currItems => {
      // item 존재하지 않을 때
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        // item 존재할 때
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(currItem => {
      return currItem.filter(item => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartToggle,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
