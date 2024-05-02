import localStorageDB from "localStorageDB";
import { v4 as uuidv4 } from "uuid";

declare global {
  var db: undefined | localStorageDB;
}

let db: localStorageDB;

if (process.env.NODE_ENV === "production") {
  db = new localStorageDB("database", "localStorage");
} else {
  if (!globalThis.db) {
    globalThis.db = new localStorageDB("database", "localStorage");
  }
  db = globalThis.db;
  const projectId1 = uuidv4();
  const projectId2 = uuidv4();
  if (!db.tableExists("projects")) {
    db.createTable("projects", ["id", "name", "description"]);
    db.insert("projects", {
      id: projectId2,
      name: "Project B",
      description: "Project B Description",
    });
    db.insert("projects", {
      id: projectId1,
      name: "Project A",
      description: "Project B Description",
    });
  }
  if (!db.tableExists("members")) {
    db.createTable("members", ["id", "name", "projectId"]);
    db.insert("members", {
      id: uuidv4(),
      name: "Melvin Willis",
      projectId: projectId1,
    });
    db.insert("members", {
      id: uuidv4(),
      name: "Colleen Fisher",
      projectId: projectId1,
    });
    db.insert("members", {
      id: uuidv4(),
      name: "Terrence Gilbert",
      projectId: projectId1,
    });
    db.insert("members", {
      id: uuidv4(),
      name: "Chris Wallace",
      projectId: projectId2,
    });
    db.insert("members", {
      id: uuidv4(),
      name: "Darryl Cook",
      projectId: projectId2,
    });
    db.insert("members", {
      id: uuidv4(),
      name: "April Castillo",
      projectId: projectId2,
    });
  }
  if (!db.tableExists("tasks")) {
    db.createTable("tasks", [
      "id",
      "name",
      "projectId",
      "memberId",
      "description",
      "status",
      "deadline",
    ]);
  }
  db.commit();
}

export default db;
