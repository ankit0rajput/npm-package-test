import { Request, Response } from 'express';

export const getExample = (req: Request, res: Response): void => {
  res.status(200).json({ message: 'GET request to the homepage' });
};

export const postExample = (req: Request, res: Response): void => {
  res.status(200).json({ message: 'POST request to the homepage' });
};
