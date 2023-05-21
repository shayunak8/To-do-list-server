import { prop, getModelForClass } from "@typegoose/typegoose";

export class Task {
  @prop({ required: true })
  public text: string;

}

export const TaskModel = getModelForClass(Task);