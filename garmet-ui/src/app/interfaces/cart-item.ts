
export interface Cart {
  content: Array<CartItem>
}
export interface CartItem {
  refId: string,
  image: string,
  productName: string,
  varietyName: string,
  price: number,
  quantity: number
}
