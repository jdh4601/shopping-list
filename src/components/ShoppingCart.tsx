import { useContext } from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { CartItem } from './CartItem';
import storeItems from '../data/items.json';

type ShoppingCartProps = {
  isOpen: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { cartToggle, cartItems } = useContext(ShoppingCartContext);
  return (
    <Offcanvas placement="end" show={isOpen} onHide={cartToggle}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem id={item.id} quantity={item.quantity} />
          ))}
          <div className="me-auto fw-bold fs-2">
            <span>Total : $</span>
            {cartItems.reduce((total, cartItem) => {
              const storedItem = storeItems.find(
                item => item.id === cartItem.id
              );
              return total + (storedItem?.price || 0) * cartItem.quantity;
            }, 0)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
