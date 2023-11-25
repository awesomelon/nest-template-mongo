import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { CommonSchema } from 'src/common/schema';

@Schema({
  versionKey: false,
})
export class User extends CommonSchema {
  @ApiProperty({ required: true, type: SchemaTypes.String })
  @IsEmail()
  @Prop()
  email: string;

  @Prop({ required: true, select: false, type: SchemaTypes.String })
  @IsString()
  password: string;

  @ApiProperty({ required: false, type: SchemaTypes.String })
  @IsString()
  @Prop()
  username: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
