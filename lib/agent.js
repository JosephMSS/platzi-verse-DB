"use strict";

const { connected } = require("../test/fixtures/agent");
class AgentSetUp {
  constructor(AgentModel) {
    this.Model = AgentModel;
  }
  async findById(id) {
    return await this.Model.findById(id);
  }
  async findByUuid(uuid) {
    return await this.Model.findOne({ where: uuid });
  }
  async findAll() {
    return await this.Model.findAll();
  }
  async findConnected() {
    return await this.Model.findAll({ where: { connected: true } });
  }
  async findByUserName(username) {
    return await this.Model.findOne({ where: { username } });
  }
  async createOrUpdate(agent) {
    const cond = {
      where: {
        uuid: agent.uuid,
      },
    };
    const existingAgent = await this.Model.findOne(cond);
    if (existingAgent) {
      const updated = await this.Model.update(agent, cond);
      return updated;
    }
    const result = await this.Model.create(agent);
    return result.toJSON();
  }
}
module.exports = { AgentSetUp };
