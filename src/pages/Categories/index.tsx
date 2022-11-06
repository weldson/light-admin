import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Category } from 'interfaces/Category';
import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';
import { Header } from '../../components/Header';

import { CategoriesContext } from '../../services/categories/categories.context';

import { AddModal } from './components/AddModal';
import { EditModal } from './components/EditModal';

export const Categories = () => {
  const [category, setCategory] = useState<Category>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { categories, removeCategory } = useContext(CategoriesContext);

  const handleEdit = async (selectedCategory: Category) => {
    setCategory(selectedCategory);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedCategory: Category) => {
    if (selectedCategory.id) {
      await removeCategory(selectedCategory.id);
    }
  };

  return (
    <>
      <Header title="Categorias" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th className="col-md-10 col-sm-9">Nome</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="align-middle">
                  <td>{c.id}</td>
                  <td>{c.name}</td>
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
        category={category}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      />
    </>
  );
};
