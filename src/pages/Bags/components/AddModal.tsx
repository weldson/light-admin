import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { BagsContext } from 'services/bags/bags.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const { createBag } = useContext(BagsContext);

  const handleSave = async () => {
    await createBag({ name, price, quantity });
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      setName('');
      setPrice(0);
      setQuantity(0);
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Adicionar Embalagem</Modal.Title>
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
