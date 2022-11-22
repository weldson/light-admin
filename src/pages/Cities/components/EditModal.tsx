import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { City } from 'interfaces/City';
import { CitiesContext } from 'services/cities/cities.context';

import { StatesContext } from 'services/states/states.context';

interface EditModalProps {
  city: City | undefined;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const EditModal = ({
  city,
  showModal,
  setShowModal,
}: EditModalProps) => {
  const [name, setName] = useState<string>('');
  const [stateId, setStateId] = useState<number>(0);

  const { states } = useContext(StatesContext);
  const { updateCity } = useContext(CitiesContext);

  const handleSave = async () => {
    if (city && city.id) {
      await updateCity(city.id, { name, stateId });
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal && city) {
      setName(city.name);
      setStateId(city.stateId);
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Editar Cidade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            onChange={(e) => setStateId(Number(e.target.value))}
            value={stateId}
          >
            <option value={0}>-</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
