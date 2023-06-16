export interface Category {
  refId: string,
  name: string,
  parent?: Category;
  children?: Array<Category>;
  parentRefId?: string;
}
