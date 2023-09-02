import prisma from '../../../shared/prisma';
import { Category } from '@prisma/client';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};

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
  createCategory,
  getAllCategory,
  getSingleCategory,
};
