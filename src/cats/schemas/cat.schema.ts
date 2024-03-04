import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CatDocumentDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @ApiProperty({ title: 'ID' })
  @Prop({ type: Types.ObjectId, required: true, default: () => uuidv4() })
  _id: string;

  @ApiProperty({ title: '名字' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ title: '描述' })
  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, default: () => Date.now() })
  createdAt: number;

  @Prop({ type: Number, default: () => Date.now() })
  updatedAt: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
