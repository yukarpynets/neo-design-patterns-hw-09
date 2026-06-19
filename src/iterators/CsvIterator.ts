import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor(filePath: string) {
    const content = readFileSync(filePath, "utf-8");
    const lines = content.trim().split("\n");
    const rows = lines.slice(1); // salta l'header

    this.data = rows.map(line => {
      const [id, name, email, phone] = line.split(",");
      return {
        id: Number(id),
        name,
        email,
        phone,
      };
    });
  }

  [Symbol.iterator](): Iterator<UserData> {
    let index = 0;
    const data = this.data;

    return {
      next(): IteratorResult<UserData> {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined as any, done: true };
      },
    };
  }
}