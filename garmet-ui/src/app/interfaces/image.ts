import {Product} from "./product";

export interface Image {
  fileId: string,
  url: string,
  name : string,
  isPrivateFile: boolean,
  fileType: string,
  tags?: Array<string>,
  product?: Product
}
