import { Bag } from 'interfaces/Bag';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { BagsContext } from 'services/bags/bags.context';

interface EditModalProps {
  bag: Bag | undefined;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const EditModal = ({ bag, showModal, setShowModal }: EditModalProps) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const { updateBag } = useContext(BagsContext);

  useEffect(() => {
    if (showModal && bag) {
      setName(bag.name);
      setQuantity(bag.quantity);
      setPrice(bag.price);
    }
  }, [showModal]);

  const handleSave = async () => {
    if (bag && bag.id) {
      await updateBag(bag.id, { name, quantity, price });
      setShowModal(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Editar Embalagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="R$ X,XX"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quant."
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={() => handleSave()}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
