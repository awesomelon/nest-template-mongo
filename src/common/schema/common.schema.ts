// core
import { Prop, Schema } from '@nestjs/mongoose';

// lib
import { IsDate, IsString } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class CommonSchema {
  @Prop({ type: SchemaTypes.ObjectId })
  @IsString()
  _is: Types.ObjectId;

  @Prop({ type: SchemaTypes.Date })
  @IsDate()
  created: Date;

  @Prop({ type: SchemaTypes.Date })
  @IsDate()
  updated: Date;
}
