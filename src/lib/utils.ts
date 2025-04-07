import { twMerge } from "tailwind-merge";

import { clsx, type ClassValue } from "clsx";

import { Databases, Query } from "node-appwrite";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function snakeCaseToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Утиліта для каскадного видалення документів.
 * @param databases - Інстанс бази даних Appwrite.
 * @param databaseId - ID бази даних.
 * @param collectionId - ID колекції, з якої потрібно видалити документи.
 * @param filters - Масив фільтрів для пошуку документів.
 * @param childCollections - Масив дочірніх колекцій для каскадного видалення.
 */
export const cascadeDelete = async (
  databases: Databases,
  databaseId: string,
  collectionId: string,
  filters: string[],
  childCollections: {
    collectionId: string;
    foreignKey: string;
  }[] = []
) => {
  const documents = await databases.listDocuments(databaseId, collectionId, filters);

  for (const document of documents.documents) {
    for (const child of childCollections) {
      await cascadeDelete(databases, databaseId, child.collectionId, [
        Query.equal(child.foreignKey, document.$id),
      ]);
    }

    await databases.deleteDocument(databaseId, collectionId, document.$id);
  }
};