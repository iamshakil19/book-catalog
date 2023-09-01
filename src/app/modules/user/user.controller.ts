import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
};
