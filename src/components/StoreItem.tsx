import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ShoppingCartContext } from '../context/ShoppingCartContext';

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, imgUrl, price }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(ShoppingCartContext); // 전역적으로 사용 가능!

  const quantity = getItemQuantity(id);

  return (
    <Card style={{ height: '200px' }}>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">${price}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseQuantity(id)}>
              Add to Cart
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column">
              <div className="d-flex">
                <Button onClick={() => increaseQuantity(id)}>+</Button>
                <div>
                  <span>{quantity} in my cart</span>
                </div>
                <Button onClick={() => decreaseQuantity(id)}>-</Button>
              </div>
              <Button onClick={() => removeFromCart(id)} variant="danger">
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
