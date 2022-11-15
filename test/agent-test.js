"use strict";
const test = require("ava");
let config = { logging: function () {} };
let db = null;
test.beforeEach(async () => {
  const setupDatabase = require("../");
  db = await setupDatabase(config);
});
test("Agent", (t) => {
    console.log("🚀 ~ file: agent-test.js ~ line 11 ~ test ~ db.Agent", db.Agent)
  t.truthy(db.Agent, "Agent service should exist");
});
