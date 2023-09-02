import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { Book, Prisma } from '@prisma/client';
import { bookSearchableFields } from './book.constant';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: { category: true },
  });
  return result;
};

const getAllBook = async (filters: any, paginationOptions: any) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, minPrice, maxPrice, ...filterData } = filters;
  console.log(filterData, 22);
  console.log(Object.keys(filterData));

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    if (filterData.category) {
      andConditions.push({
        categoryId: filterData.category,
      });
    }
  }

  if (minPrice) {
    andConditions.push({
      price: {
        gte: parseInt(minPrice),
      },
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: {
        lte: parseInt(maxPrice),
      },
    });
  }
  console.log(andConditions, 'and conditions');

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  console.log(whereConditions, 'where conditions');

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            title: 'desc',
          },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
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

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingleBook,
  getBooksByCategoryId,
  updateBook,
  deleteBook,
};
