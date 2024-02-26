import Category from "#models/category";
import { createCategoryValidator } from "#validators/category";
import type { HttpContext } from "@adonisjs/core/http";

/**
 * NOTES:
 * - In AdonisJS v6, the `validate` method has been replaced with `validateUsing`.
 * - The HttpContextContext has been replaced with HttpContext.
 * - Files follow the snake_case naming convention.
 * Thefore, the file name should be `categories_controller.ts` instead of `CategoriesController.ts`.
 * Remember that when you are doing imports.
 */
export default class CategoriesController {
  async create({ view }: HttpContext) {
    return view.render("pages/categories/create");
  }

  async store({ request, response }: HttpContext) {
    const { name, budget } = await request.validateUsing(
      createCategoryValidator
    );
    await Category.create({ name, budget });
    response.redirect("/");
  }
}
