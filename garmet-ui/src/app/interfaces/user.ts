export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
  password?: string;
  roles?: Array<Role>;

}
export interface Role{
  id: number;
  name: string
}
