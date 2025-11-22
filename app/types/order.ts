export interface OrderProductDTO {
  id: string;
  quantity: number;
  product: {
    name: string;
  };
}

export interface OrderListItemDTO {
  id: string;
  status: string;
  total: number;
  restaurant: {
    name: string;
    avatarImageUrl: string;
  };
  orderProducts: OrderProductDTO[];
}