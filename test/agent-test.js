"use strict";
const test = require("ava");
const proxyquire = require("proxyquire");
const sinon = require("sinon");
let config = { logging: function () {} };

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
