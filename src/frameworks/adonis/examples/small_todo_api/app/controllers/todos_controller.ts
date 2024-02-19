/**
 * NOTES:
 * - In AdonisJS v6, the `validate` method has been replaced with `validateUsing`.
 * - The HttpContextContext has been replaced with HttpContext.
 * - Files follow the snake_case naming convention.
 * Thefore, the file name should be `todos_controller.ts` instead of `TodosController.ts`.
 * Remember that when you are doing imports.
 */
import Todo from "#models/todo";
import { createTodoValidator } from "#validators/todo";
import type { HttpContext } from "@adonisjs/core/http";

export default class TodosController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    return response.json({ items: Todo.all() });
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    /**
     * PLEASE NOTE:
     * Make use of this `validateUsing` method to validate the request body with AdonisJS v6.
     * In AdonisJS v5, you can use the `validate` method.
     * Not anymore!!! This is the new way to validate requests in AdonisJS v6.
     */
    const payload = await request.validateUsing(createTodoValidator);
    await Todo.create(payload);
    return response.json({ message: "Todo created successfully" });
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(createTodoValidator);
    const todo = await Todo.findOrFail(params.id);
    todo.merge(payload);
    return response.json({ message: "Todo updated successfully" });
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id);
    await todo.delete();
    return response.json({ message: "Todo deleted successfully" });
  }
}
