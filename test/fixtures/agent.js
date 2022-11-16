"use strict";
const agent = {
  id: 1,
  uuid: "yyy-yyy-yyy",
  name: "fixture",
  userName: "platzi",
  hostname: "test-host",
  pid: 0,
  connected: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const agents = [
  agent,
  {
    ...agent,
    id: 2,
    uuid: "yyy-yyy-yyx",
    connected: false,
    username: "platzi2",
  },
  {
    ...agent,
    id: 3,
    uuid: "yyy-yyy-yyz",
    connected: true,
    username: "platzi3",
  },
  {
    ...agent,
    id: 4,
    uuid: "yyy-yyy-yyw",
    connected: false,
    username: "platzi4",
  },
];
console.log(agents);
module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter((agent) => agent.connected),
  platzi: agents.filter((agent) => agent.name == "platzi"),
  byUuid: (uuid) =>
    agents.find((agent) => {
      agent.uuid == uuid;
    }),
  byId: (id) =>
    agents.find((agent) => {
      agent.id == id;
    }),
};
