import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import { Customer } from 'interfaces/Customer';

import { CustomersContext } from 'services/customers/customers.context';
import { formatDate } from 'utils/format';

interface EditModalProps {
  customer: Customer | undefined;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const EditModal = ({
  customer,
  showModal,
  setShowModal,
}: EditModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');

  const { updateCustomer } = useContext(CustomersContext);

  const handleSave = async () => {
    if (customer && customer.id) {
      const dateStr = birth.split('/');
      const date = new Date(`${dateStr[1]}/${dateStr[0]}/${dateStr[2]}`);
      await updateCustomer(customer.id, { name, phone, birth: date });
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal && customer) {
      const formatedDate = formatDate(customer.birth);
      setName(customer.name);
      setPhone(customer.phone);
      setBirth(formatedDate);
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="sigla">
              <Form.Label>Telefone</Form.Label>
              <InputMask
                className="form-control"
                mask="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Data de nascimento</Form.Label>
              <InputMask
                className="form-control"
                mask="99/99/9999"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
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
