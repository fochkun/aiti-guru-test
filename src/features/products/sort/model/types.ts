import type { SortField, SortOrder } from "../../../../entities/product/model/types";


export interface SortConfig {
  key: SortField;
  order: SortOrder;
}