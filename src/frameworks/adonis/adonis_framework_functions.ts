import { $ } from "bun";
import AiFunction from "../../ai_function_decorator";
import AiFunctionsWrapper from "../../ai_functions_wrapper";
import * as changeCase from "change-case";
import pluralize from "pluralize";

export default class AdonisFrameworkFunctions extends AiFunctionsWrapper {
  @AiFunction("Scaffold some AdonisJS v6 application in the output directory", {
    type: "object",
    properties: { applicationName: { type: "string" } },
  })
  static async scaffoldAdonisApp({
    applicationName,
  }: {
    applicationName: string;
  }) {
    const result =
      await $`cd output && npm init adonisjs@latest ${applicationName} -- -K=api --install > /dev/null && echo 'AdonisJS app scaffolded'`;
    return {
      stdout: result.stdout.toString(),
      stderr: result.stderr.toString(),

      /**
       * This might be helpful for imports.
       */
      tsconfigContents: await Bun.file(
        `output/${applicationName}/tsconfig.json`
      ).text(),
    };
  }

  @AiFunction("Scaffold a model and its associated migration", {
    type: "object",
    properties: {
      applicationName: { type: "string" },
      modelName: { type: "string" },
    },
  })
  static async scaffoldModelAndAssociatedMigration({
    applicationName,
    modelName,
  }: {
    applicationName: string;
    modelName: string;
  }) {
    const result =
      await $`cd output/${applicationName} && node ace make:model ${modelName} -m`;
    const lines = result.stdout.toString().split("\n");
    const modelPath = lines[0]
      .split(" ")
      .find((s) => s.startsWith("app/models/"));
    const migrationPath = lines[1]
      .split(" ")
      .find((s) => s.startsWith("database/migrations/"));

    return {
      modelPath,
      migrationPath,
      initialModelContents: (
        await $`cat output/${applicationName}/${modelPath}`
      ).stdout.toString(),
      initialMigrationContents: (
        await $`cat output/${applicationName}/${migrationPath}`
      ).stdout.toString(),
    };
  }

  @AiFunction("Fill a model and its associated migration with contents", {
    type: "object",
    properties: {
      applicationName: { type: "string" },
      modelPath: { type: "string" },
      modelContents: { type: "string" },
      migrationPath: { type: "string" },
      migrationContents: { type: "string" },
    },
  })
  static async fillModelAndMigration({
    applicationName,
    modelPath,
    modelContents,
    migrationPath,
    migrationContents,
  }: {
    applicationName: string;
    modelPath: string;
    modelContents: string;
    migrationPath: string;
    migrationContents: string;
  }) {
    const modelResult =
      await $`echo ${modelContents} > output/${applicationName}/${modelPath} && echo 'Model filled'`;
    const migrationResult =
      await $`echo ${migrationContents} > output/${applicationName}/${migrationPath} && echo 'Migration filled'`;
    return {
      modelResult: modelResult.stdout.toString(),
      migrationResult: migrationResult.stdout.toString(),
    };
  }

  @AiFunction(
    "Run the migrations, to be used after the model and migration have been defined.",
    {
      type: "object",
      properties: { applicationName: { type: "string" } },
    }
  )
  static async runMigrations({ applicationName }: { applicationName: string }) {
    const result =
      await $`cd output/${applicationName} && node ace migration:run`;
    return result.stdout.toString();
  }

  @AiFunction(
    "Scaffold a CRUD resourceful controller and its associated validator. After this, you can fill the controller and the validator with the fillScaffoldedControllerAndValidator function and the actual logic of the application.",
    {
      type: "object",
      properties: {
        applicationName: { type: "string" },
        modelName: { type: "string" },
      },
    }
  )
  static async scaffoldCrudResourcefulValidator({
    applicationName,
    modelName,
  }: {
    applicationName: string;
    modelName: string;
  }) {
    await $`cd output/${applicationName} && node ace make:controller ${modelName} --resource && node ace make:validator ${modelName} --resource`;
    const controllerPath =
      pluralize(changeCase.snakeCase(modelName)) + "_controller.ts";
    const validatorPath = changeCase.snakeCase(modelName) + ".ts";

    return {
      controllerPath,
      validatorPath,
      initialControllerContents: await Bun.file(
        `output/${applicationName}/app/controllers/${controllerPath}`
      ).text(),
      initialValidatorContents: await Bun.file(
        `output/${applicationName}/app/validators/${validatorPath}`
      ).text(),
    };
  }

  @AiFunction(
    "Fill a controller and its associated validator with contents. PS: It is assumed that the controller and the validator have been scaffolded before.",
    {
      type: "object",
      properties: {
        applicationName: { type: "string" },
        controllerPath: { type: "string" },
        controllerContents: { type: "string" },
        validatorPath: { type: "string" },
        validatorContents: { type: "string" },
      },
    }
  )
  static async fillControllerAndValidator({
    applicationName,
    controllerPath,
    controllerContents,
    validatorPath,
    validatorContents,
  }: {
    applicationName: string;
    controllerPath: string;
    controllerContents: string;
    validatorPath: string;
    validatorContents: string;
  }) {
    const controllerResult =
      await $`echo ${controllerContents} > output/${applicationName}/app/controllers/${controllerPath} && echo 'Controller filled'`;
    const validatorResult =
      await $`echo ${validatorContents} > output/${applicationName}/app/validators/${validatorPath} && echo 'Validator filled'`;
    return {
      controllerResult: controllerResult.stdout.toString(),
      validatorResult: validatorResult.stdout.toString(),
    };
  }

  @AiFunction("Append a route to the routes file of the AdonisJS application", {
    type: "object",
    properties: {
      applicationName: { type: "string" },
      routeContents: { type: "string" },
    },
  })
  static async appendToRoutesFile({
    applicationName,
    routeContents,
  }: {
    applicationName: string;
    routeContents: string;
  }) {
    const result =
      await $`echo ${routeContents} >> output/${applicationName}/start/routes.ts`;
    return result.stdout.toString();
  }
}
