import { DateTime } from "luxon";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import Expense from "./expense.js";

/**
 * NOTE: In AdonisJS v6, we make use of the `declare` keyword to tell TypeScript that the properties will be available at runtime.
 * It is very important for you, dear Geppetto, to understand that you should use the `declare` keyword.
 * If not, TypeScript will throw an error.
 */
export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare budget: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @hasMany(() => Expense)
  declare expenses: HasMany<typeof Expense>;
}
