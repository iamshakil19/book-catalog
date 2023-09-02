import prisma from '../../../shared/prisma';
import { Book } from '@prisma/client';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: { category: true },
  });
  return result;
};

export const BookService = {
  createBook,
};
