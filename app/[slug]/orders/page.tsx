import { db } from "@/lib/prisma";
import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm />;
  }
  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  const mappedOrders = orders.map((order) => ({
    id: String(order.id),
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    customerCpf: order.customerCpf,
    total: order.total,
    consumptionMethod: order.consumptionMethod,

    restaurant: {
      name: order.restaurant.name,
      avatarImageUrl: order.restaurant.avatarImageUrl,
    },
    orderProducts: order.orderProducts.map((op) => ({
      id: String(op.id),
      quantity: op.quantity,
      product: {
        id: op.product.id,
        name: op.product.name,
        description: op.product.description,
        price: op.product.price,
        imageUrl: op.product.imageUrl,
        restaurantId: op.product.restaurantId,
        ingredients: op.product.ingredients,
        menuCategoryId: op.product.menuCategoryId,
        createdAt: op.product.createdAt,
        updatedAt: op.product.updatedAt,
      },
    })),
  }));

  return ( 
    <OrderList orders={mappedOrders} />
   );
}
 
export default OrdersPage;