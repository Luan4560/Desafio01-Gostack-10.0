const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function countRequest(req, res, next) {
  console.count("Number of requisitions");

  return next();
};

function verifyId(req, res, next) {
  const { id } = req.params;
  const project = projects.find(index => index.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }
  return next();
}

server.use(countRequest);

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

server.put("/projects/:id", verifyId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const updateTitle = projects.find(index => index.id == id);

  updateTitle.title = title;

  return res.json(updateTitle);
});

server.delete("/projects/:id", verifyId, (req, res) => {
  const { id } = req.params;

  const deleteProject = projects.findIndex(index => index.id == id);

  projects.splice(deleteProject, 1);

  return res.status(200).json({ Ok: 'Project was deleted' });
});

server.post("/projects/:id/tasks", verifyId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(index => index.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
