import { State } from 'interfaces/State';
import { db } from '../../db';

export const listStates = async () => {
  const states = await db.states.toArray();

  return states;
};
