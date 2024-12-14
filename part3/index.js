const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(":method: url :status :res[content-length] - :response-time ms :body")
);
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const numberOfEntries = persons.length;
  const currentTime = new Date();
  response.send(
    `Phone book has info for ${numberOfEntries} people <br> ${currentTime}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `Note with id ${id} not found`;
    response.status(404).end;
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === person);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
    response.json(persons);
  } else {
    response.statusMessage = `person with id ${id} not found`;
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name cannot be missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number cannot be missing",
    });
  }
  const existingPerson = persons.find((person) => person.name === body.name);
  const existingNumber = persons.find(
    (person) => person.number === body.number
  );
  if (existingPerson) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  if (existingNumber) {
    return response.status(400).json({
      error: "number must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
