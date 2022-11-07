import { State } from 'interfaces/State';
import { alert } from 'utils/alert';
import { db } from '../../db';

export const listStates = async () => {
  const states = await db.states.toArray();

  return states;
};

export const save = async (state: State) => {
  const stateExists = await db.states.get({ name: state.name });

  if (stateExists) {
    alert.error('Já existe um estado com este nome!');
    return;
  }
  await db.states.add(state);
  alert.success('Estado cadastrado com sucesso!');
};

export const update = async (id: number, state: State) => {
  // const stateExists = await db.states.where({ name: state.name });
  await db.states.update(id, state);
};

export const remove = async (id: number) => {
  const cityInState = await db.cities.get({ stateId: id });

  if (cityInState) {
    alert.error(
      'Este estado não pode ser deletado pois existe uma cidade nele!'
    );
    return;
  }
  await db.states.delete(id);
  alert.success('Estado removido com sucesso!');
};
