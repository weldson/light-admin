import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';
import { City } from 'interfaces/City';
import { CitiesContext } from 'services/cities/cities.context';
import { Header } from '../../components/Header';

import { AddModal } from './components/AddModal';
import { EditModal } from './components/EditModal';

export const Cities = () => {
  const [city, setCity] = useState<City>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { cities, removeCity } = useContext(CitiesContext);

  const handleEdit = async (selectedCity: City) => {
    setCity(selectedCity);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedCity: City) => {
    if (selectedCity.id) {
      await removeCity(selectedCity.id);
    }
  };

  return (
    <>
      <Header title="Cidades" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th>Nome</th>
                <th>Estado</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c.id} className="align-middle">
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.state && c.state?.name}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(c)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(c)}>
                      <IoMdTrash color="#5f5b5b" size={16} />
                    </CircleButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </CustomCard.Body>
      </CustomCard>

      <AddModal showModal={showModalAdd} setShowModal={setShowModalAdd} />

      <EditModal
        city={city}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      />
    </>
  );
};
