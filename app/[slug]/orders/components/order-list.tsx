"use client";

import { OrderStatus } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

import { OrderListItemDTO } from "@/app/types/order";

interface OrderListProps {
  orders: OrderListItemDTO[];
}

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "FINISHED":
      return "Finalizado";
    case "IN_PREPARATION":
      return "Em preparo";
    case "PENDING":
      return "Pendente";
    case "EXPIRED":
      return "Pagamento expirado";
    case "PAYMENT_CONFIRMED":
      return "Pagamento confirmado";
    case "PAYMENT_FAILED":
      return "Pagamento falhou";
    default:
      return "";
  }
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-4">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${([OrderStatus.PAYMENT_CONFIRMED, OrderStatus.FINISHED] as OrderStatus[]).includes(order.status as OrderStatus) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"} `}
            >
              {getStatusLabel(order.status as OrderStatus)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  className="rounded-sm"
                  fill
                  sizes="auto"
                  loading="eager"
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;