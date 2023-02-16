import { useContext } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { Button, Stack } from 'react-bootstrap';
import storeItems from '../data/items.json';

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useContext(ShoppingCartContext);
  const storedItem = storeItems.find(item => item.id === id);
  if (storedItem == null) return null;
  return (
    <div>
      <Stack direction="horizontal" gap={2}>
        <img
          src={storedItem.imgUrl}
          style={{ width: '100px', height: '70px', objectFit: 'cover' }}
        />
        <div className="me-auto">
          <div className="d-flex flex-column">
            <div>
              <span>{storedItem.name}</span>
              {quantity > 1 && (
                <span className="text-muted"> x {quantity}</span>
              )}
            </div>
            <span>${storedItem.price}</span>
          </div>
        </div>
        <h3>${storedItem.price * quantity}</h3>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            removeFromCart(storedItem.id);
          }}
        >
          x
        </Button>
      </Stack>
    </div>
  );
}
