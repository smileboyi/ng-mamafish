import { Schema } from 'mongoose';

export const ProvinceSchema = new Schema(
  {
    code: String,
    name: String,
    children: [
      {
        code: String,
        name: String,
      },
    ],
  },
  { collection: 'province', autoIndex: false },
);
