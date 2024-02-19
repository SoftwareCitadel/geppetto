import router from "@adonisjs/core/services/router";
import TodosController from "#controllers/todos_controller";
router
  .resource("todos", TodosController)
  .as("todos")
  .except(["show", "create", "edit"]);
