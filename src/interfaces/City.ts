import { State } from './State';

export interface City {
  id?: number;
  name: string;
  stateId: number;
  state?: State;
}
