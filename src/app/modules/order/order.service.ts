import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (user: any, payload: any) => {
  const { userId, role } = user;

  const isExist = await prisma.user.findUnique({ where: { id: userId } });

  const { orderedBooks } = payload;

  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
};
