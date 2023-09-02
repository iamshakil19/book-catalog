import prisma from '../../../shared/prisma';
import { Book } from '@prisma/client';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: { category: true },
  });
  return result;
};

const getAllBook = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({ include: { category: true } });
  return result;
};

const getBooksByCategoryId = async (categoryId: string) => {
  const result = await prisma.book.findMany({ where: { categoryId } });
  return result;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: { category: true },
  });

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
    include: { category: true },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  getBooksByCategoryId,
  updateBook,
};
