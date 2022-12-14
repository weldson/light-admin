import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { CitiesContext } from 'services/cities/cities.context';
import { CompaniesSizeContext } from 'services/companies-size/companies-size.context';

import { ProvidersContext } from 'services/providers/providers.context';
import { StatesContext } from 'services/states/states.context';

import { Category } from 'interfaces/Category';
import { CategoriesContext } from 'services/categories/categories.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [companySizeId, setCompanySizeId] = useState<number>(0);
  const [number, setNumber] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [cityId, setCityId] = useState<number>(0);

  const [categoryFields, setCategoryFields] = useState<Category[]>([
    {
      name: '',
      id: 0,
    } as Category,
  ]);

  const { createProvider } = useContext(ProvidersContext);
  const { companiesSize } = useContext(CompaniesSizeContext);
  const { states } = useContext(StatesContext);
  const { cities, filterCities } = useContext(CitiesContext);
  const { categories } = useContext(CategoriesContext);

  const handleSave = async () => {
    await createProvider({
      name,
      phone,
      instagram,
      website,
      whatsapp,
      companySizeId,
      street,
      number,
      neighborhood,
      cityId,
      categories: categoryFields,
    });
    setShowModal(false);
  };

  const onChangeState = async (value: string) => {
    const id = Number(value);

    if (id) {
      await filterCities(Number(id));
    } else {
      setCityId(0);
      await filterCities(-1); // just to clear the cities
    }
  };

  useEffect(() => {
    if (showModal) {
      setName('');
    }
  }, [showModal]);

  const handleFormChange = (index: number, category: string) => {
    const data = [...categoryFields];
    data[index].id = Number(category);
    setCategoryFields(data);
  };

  const addCategoryField = () => {
    const newField = { name: '' };

    setCategoryFields([...categoryFields, newField]);
  };

  const removeCategoryField = (index: number) => {
    const data = [...categoryFields];
    data.splice(index, 1);
    setCategoryFields(data);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Adicionar Fornecedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="col-md-12 col-sm-12">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fornecedor ABC"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 col-sm-4">
            <Form.Group className="mb-3" controlId="whatsapp">
              <Form.Label>WhatsApp</Form.Label>
              <InputMask
                className="form-control"
                mask="(99) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-4 col-sm-4">
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefone</Form.Label>
              <InputMask
                className="form-control"
                mask="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-4 col-sm-4">
            <Form.Group className="mb-3" controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="@pikena"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.pikena.com.br"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="size">
              <Form.Label>Porte</Form.Label>
              <Form.Select
                onChange={(e) => setCompanySizeId(Number(e.target.value))}
                value={companySizeId}
              >
                <option value={0}>-</option>
                {companiesSize.map((cs) => (
                  <option key={cs.id} value={cs.id}>
                    {cs.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-12 col-sm-12">
            <Form.Group className="mb-3" controlId="street">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rua Fulano de Tal"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-3 col-sm-4">
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                placeholder="97A"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-9 col-sm-8">
            <Form.Group className="mb-3" controlId="neighborhood">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Barreto"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>Estado</Form.Label>
              <Form.Select onChange={(e) => onChangeState(e.target.value)}>
                <option value={0}>-</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>Cidade</Form.Label>
              <Form.Select
                value={cityId}
                onChange={(e) => setCityId(Number(e.target.value))}
              >
                <option value={0}>-</option>
                {cities.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {categoryFields.map((input, idx) => (
          <Row>
            <Col className={idx === 0 ? 'col-sm-12' : 'col-sm-9'}>
              {/* <Form.Label>Fornece</Form.Label> */}
              <Form.Group className="mb-3" controlId="state">
                <Form.Select
                  onChange={(e) => handleFormChange(idx, e.target.value)}
                >
                  <option value={0}>-</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            {idx !== 0 && (
              <Col className="col-sm-3">
                <Button onClick={() => removeCategoryField(idx)}>
                  Remover
                </Button>
              </Col>
            )}
          </Row>
        ))}
        <Button variant="primary" onClick={() => addCategoryField()}>
          Adicionar
        </Button>
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
