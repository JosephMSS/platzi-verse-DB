import { describe, it, expect, vi, expectTypeOf } from "vitest";
import { Metric } from "./metric.model";
const { DataTypes, Model, Sequelize } = require("sequelize");
const { AgentSchema, AGENT_TABLE, Agent } = require("./agent.model");
const AGENT_TABLE_NAME_TEST = "agents";
vi.mock("sequelize");
describe("AgentSchema()", () => {
  it("Validate AgentSchema.uuid", () => {
    expect(AgentSchema.uuid.type.key).toBe(DataTypes.STRING.key);
    expect(AgentSchema.uuid.allowNull).toBe(false);
  });
  it("Validate AgentSchema.username", () => {
    expect(AgentSchema.username.type.key).toBe(DataTypes.STRING.key);
    expect(AgentSchema.username.allowNull).toBe(false);
  });
  it("Validate AgentSchema.name", () => {
    expect(AgentSchema.name.type.key).toBe(DataTypes.STRING.key);
    expect(AgentSchema.name.allowNull).toBe(false);
  });
  it("Validate AgentSchema.hostname", () => {
    expect(AgentSchema.hostname.type.key).toBe(DataTypes.STRING.key);
    expect(AgentSchema.hostname.allowNull).toBe(false);
  });
  it("Validate AgentSchema.pid", () => {
    expect(AgentSchema.pid.type.key).toBe(DataTypes.INTEGER.key);
    expect(AgentSchema.pid.allowNull).toBe(false);
  });
  it("Validate AgentSchema.connected", () => {
    expect(AgentSchema.connected.type.key).toBe(DataTypes.BOOLEAN.key);
    expect(AgentSchema.connected.allowNull).toBe(false);
  });
});
describe("AGENT_TABLE", () => {
  it('should agent table name to be "agents" ', () => {
    expect(AGENT_TABLE).toBe(AGENT_TABLE_NAME_TEST);
  });
});
describe("class Agent()", () => {
  describe("associate()", () => {
    it("should called hasMany with Metric", () => {
      const testAssociateOptions = { as: "metrics" };
      Agent.hasMany = vi.fn().mockImplementationOnce((...args) => {});

      Agent.associate({ Metric });

      expect(Agent.hasMany).toBeCalled();
      expect(Agent.hasMany).toBeCalledWith(Metric, testAssociateOptions);
    });
  });
  describe("config", () => {
    it("should return model config", () => {
      const sequelize = vi.fn();

      const testConfig = {
        sequelize,
        tableName: AGENT_TABLE_NAME_TEST,
        modelName: "Agent",
        timestamps: true,
      };
      const config = Agent.config(sequelize);
      expect(config).toStrictEqual(testConfig);
    });
  });
});
