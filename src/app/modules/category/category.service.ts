import prisma from '../../../shared/prisma';
import { Category } from '@prisma/client';

const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({ include: { books: true } });
  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: { books: true },
  });

  return result;
};

export const CategoryService = {
  getAllCategory,
  getSingleCategory,
};
