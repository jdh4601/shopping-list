import storeItems from '../data/items.json';
import { Row, Col } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';

export function Store() {
  return (
    <div>
      <h1>STORE</h1>
      <Row className="d-flex flex-column g-3 md-3 xs-1 lg-3">
        {storeItems.map(item => (
          <Col key={item.id}>
            <StoreItem
              id={item.id}
              name={item.name}
              imgUrl={item.imgUrl}
              price={item.price}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
