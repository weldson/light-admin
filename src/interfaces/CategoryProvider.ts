import { Provider } from './Provider';
import { Category } from './Category';

export interface CategoryProvider {
  id?: number;
  categoryId: number;
  providerId: number;
  category?: Category;
  provider?: Provider;
}
