import { State } from 'interfaces/State';
import { db } from '../../db';

export const listStates = async () => {
  const states = await db.states.toArray();

  return states;
};

export const save = async (state: State) => {
  await db.states.add(state);
};

export const update = async (id: number, state: State) => {
  await db.states.update(id, state);
};

export const remove = async (id: number) => {
  await db.states.delete(id);
};
