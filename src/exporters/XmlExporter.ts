import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class XmlExporter extends DataExporter {
  protected render(): string {
    const users = this.data
      .map(
        user => `  <user>
    <id>${user.id}</id>
    <name>${user.name}</name>
    <email>${user.email}</email>
    <phone>${user.phone}</phone>
  </user>`
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<users>\n${users}\n</users>`;
  }

  protected afterRender() {
    console.log("XML rendering complete, adding final touches...");
  }

  protected save(): void {
    const filePath = "./dist/users.xml";
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filePath, this.result, "utf-8");
    console.log(`XML exported to ${filePath}`);
  }
}