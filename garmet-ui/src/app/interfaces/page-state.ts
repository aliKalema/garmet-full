export interface PageState {
  pageIndex: number;
  pageSize: number;
  totalElements?: number;
  totalPages?: number,
  filtered?: boolean,
  searchTerm?: string,
}
