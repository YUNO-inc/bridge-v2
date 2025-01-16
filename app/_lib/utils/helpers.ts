import { models } from "mongoose";

export function cleanupModel(modelName: string) {
  if (process.env.NODE_ENV !== "development") return;
  if (models[modelName]) {
    delete models[modelName];
  }
}
