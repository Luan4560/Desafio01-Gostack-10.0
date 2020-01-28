const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({
    id,
    title,
    tasks
  });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const updateTitle = projects.find(index => index.id == id);

  updateTitle.title = title;

  return res.json(updateTitle);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const deleteProject = projects.findIndex(index => index.id == id);

  projects.splice(deleteProject, 1);

  return res.status(200).send("[Ok] Deleted project");
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(index => index.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
