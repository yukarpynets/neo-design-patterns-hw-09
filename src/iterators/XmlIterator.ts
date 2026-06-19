import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor(filePath: string) {
    const content = readFileSync(filePath, "utf-8");
    const parser = new XMLParser();
    const parsed = parser.parse(content);

    const users = parsed.users.user;
    const userArray = Array.isArray(users) ? users : [users];

    this.data = userArray.map((user: any) => ({
      id: Number(user.id),
      name: user.name,
      email: user.email,
      phone: String(user.phone),
    }));
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