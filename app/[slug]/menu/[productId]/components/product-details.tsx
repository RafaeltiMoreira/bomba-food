"use client";

import { Button } from "@/app/_components/ui/button";
import { Prisma } from "@/app/generated/prisma/client";
import { formatCurrency } from "@/helpers/format-currency";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="relative z-50 -mt-6 flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
      <div className="flex-auto overflow-hidden">
        {/* Restaurante */}
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={28}
            height={28}
            className="rounded-full"
          />
          <p className="text-muted-foreground text-xs">
            {product.restaurant.name}
          </p>
        </div>

        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* Preço e quantidade */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>

        {/* Ingredientes */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1">
            <ChefHatIcon size={18} />
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>
      </div>

      {/* Adicionar ao carrinho */}
      <Button className="mt-6 w-full rounded-full">
        Adicionar ao carrinho
      </Button>
    </div>
  );
};

export default ProductDetails;
