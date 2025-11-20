"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@/app/generated/prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return ( 
    <div className="relative min-h-[300px] w-full">
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute bottom-8 left-4 rounded-full z-50"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
        <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute bottom-8 right-4 rounded-full z-50"
          onClick={handleOrdersClick}
        >
          <ScrollTextIcon />
        </Button>
      </div>
   );
}
 
export default ProductHeader;