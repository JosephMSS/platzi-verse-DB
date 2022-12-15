import { describe, it, expect, vi } from "vitest";

const {
  setupDatabase,
  validateConnection,
  connectionResponse,
} = require("./sequelize");
describe("sequelize.lib", () => {
  describe("connectionResponse()", () => {
    it("Retorna el mismo message y hasConnection que se envió por parámetros", () => {
      const hasConnectionTest = true;
      const messageTest = "test message";
      const { hasConnection, message } = connectionResponse({
        hasConnection: hasConnectionTest,
        message: messageTest,
      });
      expect(hasConnection).toBe(hasConnectionTest);
      expect(message).toBe(messageTest);
    });
    it("Retorna un message por default si no se proporciona uno", () => {
      const hasConnectionTest = true;
      const { hasConnection, message } = connectionResponse({
        hasConnection: hasConnectionTest,
      });
      expect(hasConnection).toBe(hasConnectionTest);
      expect(message).toBeTypeOf("string");
    });
    it("Retorna un hasConnection true por default si no se proporciona uno", () => {
      const messageTest = "test message";
      const { hasConnection, message } = connectionResponse({
        message: messageTest,
      });
      expect(hasConnection).not.toBeUndefined();
      expect(hasConnection).not.toBeTruthy();
      expect(hasConnection).not.toBeNull();

      expect(hasConnection).not.toBeTypeOf("number");
      expect(hasConnection).toBeTypeOf("boolean");
      expect(message).toBe(messageTest);
    });
  });
  describe("setupDatabase()", () => {
    it("debe retornar una instancia de sequelize", () => {
      const Sequelize = vi.fn();
      const URI = "String uri";
      const engine = "test";
      const logging = true;

      const sequelize = setupDatabase({ engine, logging, Sequelize, URI });

      expect(sequelize).instanceOf(Sequelize);
      expect(Sequelize).toBeCalledWith(URI, { dialect: engine, logging });
    });
    it("Sequelize debe ser llamado con los parámetros asignados", () => {
      const Sequelize = vi.fn();
      const URI = "String uri";
      const engine = "test";
      const logging = true;

      const sequelize = setupDatabase({ engine, logging, Sequelize, URI });

      expect(Sequelize).toBeCalledWith(URI, { dialect: engine, logging });
    });
  });
  describe("validateConnection()", () => {
    it("sequelize.authenticate debe ser llamada una vez", async () => {
      const sequelize = { authenticate: vi.fn() };
      await validateConnection(sequelize);
      expect(sequelize.authenticate).toHaveBeenCalledOnce();
    });
    it("Retorna hasConnection true si se resuelve la promesa y un mensaje", async () => {
      const sequelize = {
        authenticate: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
      };

      const { hasConnection, message } = await validateConnection(sequelize);

      expect(hasConnection).toBeTruthy();
      expect(message).toBeTypeOf("string");
      expect(message).toBe("Connection has been established successfully.");
    });
    it("Retorna hasConnection false si no se resuelve la promesa y un mensaje", async () => {
      const errorMessageTest = "error test";
      const sequelize = {
        authenticate: () => {
          return new Promise((resolve, reject) => {
            return reject(errorMessageTest);
          });
        },
      };

      const { hasConnection, message } = await validateConnection(sequelize);

      expect(hasConnection).toBeFalsy();

      expect(message).toBeTypeOf("string");
      console.log("🚀 ~ file: sequelize.test.js:102 ~ it ~ message", message);
      expect(message).toBe(
        `Unable to connect to the database: ${errorMessageTest}`
      );
    });
  });
});
