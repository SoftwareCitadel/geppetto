import AdonisFrameworkFunctions from "./adonis_framework_functions";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

type FilePath = string;
type FileContent = string;
type ExampleCodebase = Record<FilePath, FileContent>;

export default class AdonisFramework extends AdonisFrameworkFunctions {
  async loadExample(type: "webapp" | "api"): Promise<ExampleCodebase> {
    const exampleBasePath =
      type === "webapp"
        ? "./src/frameworks/adonis/examples/demo_expenses_management_webapp"
        : "./src/frameworks/adonis/examples/small_todo_api";
    const example: ExampleCodebase = {};

    /**
     * Read the base path recursively and populate the example object
     */
    const readDir = async (dir: string) => {
      const files = await readdir(dir);
      for (const file of files) {
        const filePath = join(dir, file);
        const stats = await stat(filePath);
        if (stats.isDirectory()) {
          await readDir(filePath + "/");
        } else {
          example[filePath] = await Bun.file(filePath).text();
        }
      }
    };

    await readDir(exampleBasePath);

    return example;
  }
}
