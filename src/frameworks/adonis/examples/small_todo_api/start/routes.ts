import router from "@adonisjs/core/services/router";
import TodosController from "#controllers/todos_controller";

/**
 * PLEASE NOTE:
 * Dear Geppetto, in AdonisJS v6, we make use of `router` in lowercase, from the `@adonisjs/core/services/router` module.
 * This is the new way to import the router in AdonisJS v6.
 * We also need to import the controllers we want to use.
 * The middlewares are applied using .use(middleware.auth()) for example, for single routes.
 * For a group of routes, we can use .use('*', middleware.auth()) to apply the middleware to all routes in the group.
 * Or we can define each middleware for each route, using .use(['index', 'store'], middleware.auth()) for example.
 */

router
  .resource("todos", TodosController)
  .as("todos")
  .except(["show", "create", "edit"]);
