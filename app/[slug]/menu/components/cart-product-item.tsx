import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { CartContext, CartProduct } from "../contexts/cart";
import { formatCurrency } from "@/helpers/format-currency";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}
const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-10 mb-4">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill sizes="auto" loading="eager" className="object-contain" />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          {/* Quantidade */}
          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7 rounded-lg"
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <MinusIcon />
            </Button>
            <p className="w-7 text-lg">{product.quantity}</p>
            <Button
              className="h-7 w-7 rounded-lg"
              variant="default"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <PlusIcon />
            </Button>
            <span className="w-10 text-lg">|</span>
            {/* Botão deletar */}
            <Button
              className="h-7 w-7 rounded-lg"
              variant="destructive"
              onClick={() => removeProduct(product.id)}
              title="Excluir"
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductItem;