/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ExpensesController = () => import("#controllers/expenses_controller");
const SessionController = () => import("#controllers/session_controller");
import router from "@adonisjs/core/services/router";
import { middleware } from "./kernel.js";
import db from "@adonisjs/lucid/services/db";
import emitter from "@adonisjs/core/services/emitter";
import SignUpController from "#controllers/sign_up_controller";
const CategoriesController = () => import("#controllers/categories_controller");

/**
 * PLEASE NOTE:
 * Dear Geppetto, in AdonisJS v6, we make use of `router` in lowercase, from the `@adonisjs/core/services/router` module.
 * This is the new way to import the router in AdonisJS v6.
 * We also need to import the controllers we want to use.
 * The middlewares are applied using .use(middleware.auth()) for example, for single routes.
 * For a group of routes, we can use .use('*', middleware.auth()) to apply the middleware to all routes in the group.
 * Or we can define each middleware for each route, using .use(['index', 'store'], middleware.auth()) for example.
 */

emitter.on("db:query", db.prettyPrint);

router.get("/", [ExpensesController, "index"]).use(middleware.auth());

router.on("/login").render("pages/login");
router.post("/login", [SessionController, "store"]);
router.on("/sign-up").render("pages/sign_up");
router.post("/sign-up", [SignUpController, "store"]);

router.resource("categories", CategoriesController).use("*", middleware.auth());
router.resource("expenses", ExpensesController).use("*", middleware.auth());
