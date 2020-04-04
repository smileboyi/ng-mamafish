import { Document } from 'mongoose';

export interface Province extends Document {
  name: string;
  code: string;
  children: Array<{
    name: string;
    code: string;
  }>;
}
