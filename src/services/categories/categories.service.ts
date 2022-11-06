import { Category } from 'interfaces/Category';
import { alert } from 'utils/alert';
import { db } from '../../db';

export const list = async () => {
  const categories = await db.categories.toArray();

  return categories;
};

export const save = async (category: Category) => {
  const categoryExists = await db.categories.get({ name: category.name });

  if (categoryExists) {
    alert.error('Já existe uma categoria com este nome!');
    return;
  }
  try {
    await db.categories.add(category);
    alert.success('Categoria criada com sucesso!');
  } catch {
    alert.error('Algo de errado acontenceu, tente novamente!');
  }
};

export const update = async (id: number, category: Category) => {
  await db.categories.update(id, category);
};

export const remove = async (id: number) => {
  await db.categories.delete(id);
};
