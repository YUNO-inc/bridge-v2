import { models } from "mongoose";

export function cleanupModel(modelName: string) {
  if (process.env.NODE_ENV !== "development") return;
  if (models[modelName]) {
    delete models[modelName];
  }
}

export function serializeMongoDocument(doc: object | any) {
  if (typeof doc !== "object") return doc;
  return JSON.parse(
    JSON.stringify(doc, (key, value) => {
      if (value instanceof Object && value._bsontype === "ObjectId") {
        return value.toString(); // Convert ObjectId to string
      }
      if (value instanceof Date) {
        return value.toISOString(); // Convert Date to string
      }
      return value; // Default for other fields
    })
  );
}
