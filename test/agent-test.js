"use strict";
const test = require("ava");
const proxyquire = require("proxyquire");
const sinon = require("sinon");
let config = { logging: function () {} };
const agentFixture = require("./fixtures/agent");
/**
 * Declaramos el objeto null, ya que este va a ser el
 * modelo que vamos a estar testeando constantemente,
 * por loq ue necesitamos que se reinicie antes
 * de cada test
 */
/**
 * @typedef AgentStub Object
 * @property {Function} hasMany Este proviene de el sandbox para poder reiniciarlo al final de los test
 */
/**
 * @type {AgentStub}
 */
let single = { ...agentFixture.single };
const uuid = "yyy-yyy-yyy";
const uuidArgs = {
  where: {
    uuid,
  },
};
let connectedArgs = { where: { connected: true } };
let usernameArgs = { where: { username: "platzi", connected: true } };
let newAgent = {
  id: 1,
  uuid: "123-123-123",
  name: "test",
  userName: "test",
  hostname: "test",
  pid: 0,
  connected: true,
};
const ID = 1;
let AgentStub = null;
let db = null;
let sandbox = null;
/**
 * @param proxyquire Se usa para sustituir require en los archivos por mocks
 */
/**
 * !Para evitar usar proxyquire podemos implementar inyección de dependencias
 */
/**
 * *Recordar que debemos testear unicamente nuestras aplicación y nuestras
 * *funcionalidades,lo único que debemos verificar es si se están
 * *implementando los métodos correspondientes en la aplicación
 */
//#region Construcción de Mocks
/**
 * Validar que se llame el método de belong to
 * por medio de un spy, que nos va a permitir
 * hacerle la pregunta a la función de
 * cuantas veces y con que
 * argumentos se llamo
 */

let MetricStub = {
  belongsTo: sinon.spy(),
};
//#endregion Construcción de Mocks
test.beforeEach(async () => {
  sandbox = sinon.createSandbox();
  AgentStub = {
    hasMany: sandbox.spy(),
  };
  AgentStub.findById = sandbox.stub();
  AgentStub.findById
    .withArgs(ID)
    .returns(Promise.resolve(agentFixture.findById(ID)));

  AgentStub.findOne = sandbox.stub();
  AgentStub.findOne
    .withArgs(uuidArgs)
    .returns(Promise.resolve(agentFixture.findByUuid(uuid)));

  AgentStub.update = sandbox.stub();
  AgentStub.update
    .withArgs(single, uuidArgs)
    .returns(Promise.resolve(agentFixture.findByUuid(single)));

  AgentStub.create = sandbox.stub();
  AgentStub.create.withArgs(newAgent).returns(
    Promise.resolve({
      toJSON() {
        return newAgent;
      },
    })
  );

  const setupDatabase = proxyquire("../", {
    "./models/agent": () => AgentStub,
    "./models/metric": () => MetricStub,
  });
  db = await setupDatabase(config);
});
test.afterEach(() => {
  sandbox && sandbox.restore();
});
test("Agent", (t) => {
  t.truthy(db.Agent, "Agent service should exist");
});
/**
 * !Test serial, ya que , AVA ejecuta los test de forma paralela
 * !por lo que no podemos garantizar los datos de los mocks
 * !,asi que de forma serial se ejecuta uno , por uno
 */
test.serial("SetUp", (t) => {
  t.true(AgentStub.hasMany.called, "AgentModel.has many was executed");
  t.true(MetricStub.belongsTo.called, "MetricStub.belongsTo was executed");
  /**
   * También puedo validar si la función fue llamada con argumentos
   */
  t.true(
    AgentStub.hasMany.calledWith(MetricStub),
    "Arguments should  be Metric model"
  );
  t.true(
    MetricStub.belongsTo.calledWith(AgentStub),
    "Argument should  be Agent model"
  );
});
test.serial("agent findbyId", async (t) => {
  /**
   * *En el caso de las bases de datos,
   * *las pruebas nos permiten especificar
   * *las funciones que deseamos llamar
   * *dentro de los servicios.
   */
  const agent = await db.Agent.findById(ID);
  t.deepEqual(agent, agentFixture.findById(ID), "should be the same");
});
test.serial("Agent createOrUpdate()- new", async (t) => {
  let agent = await db.Agent.createOrUpdate(newAgent);
  t.true(AgentStub.findOne.called, "findOne should be called on model");
  t.true(AgentStub.findOne.calledOnce, "findOne should be called once");
  t.true(
    AgentStub.findOne.calledWith({
      where: { uuid: newAgent.uuid },
    }),
    "findOne should be called with uuid args"
  );
  t.true(AgentStub.create.called, "create should be called on model");
  t.true(AgentStub.create.calledOnce, "create should be called once");
  t.true(
    AgentStub.create.calledWith(newAgent),
    "create should be called with specified args"
  );

  t.deepEqual(agent, newAgent, "agent should be the same");
});
