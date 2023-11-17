// core
import { Prop, Schema } from '@nestjs/mongoose';

// lib
import { IsDate, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class CommonSchema {
  @Prop({ required: false, type: SchemaTypes.String })
  @IsString()
  id: string;

  @Prop({ type: SchemaTypes.Date })
  @IsDate()
  created: Date;

  @Prop({ type: SchemaTypes.Date })
  @IsDate()
  updated: Date;
}
