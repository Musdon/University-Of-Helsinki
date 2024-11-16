import axios from "axios";
import { useEffect, useState } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialObject) => {
      setPersons(initialObject);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchField = (event) => {
    setSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.some((person) => person.name === newName);
    if (existingPerson) {
      alert(`${newName} is already in the phone book, replace old number?`);
      const person = persons.find((p) => p.name === newName);
      console.log(`person being updated is ${person.name}`);

      personService
        .updateNumber(person.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
        })
        .catch((error) => {
          alert(
            `Failed to update ${newName} perhaps they've previously been deleted`
          );
          setPersons(persons.filter((person) => person.id !== existingPerson));
        });
      setNewName("");
      setNewNumber("");
    } else {
      personService.create(personObject).then((returnedObject) => {
        setPersons(persons.concat({ name: newName, number: newNumber }));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id, event) => {
    // event.preventDefault();
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const personsToShow = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={search} onChange={handleSearchField} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>
            {person.name} {person.number}{" "}
            <button onClick={(event) => deletePerson(person.id, event)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
