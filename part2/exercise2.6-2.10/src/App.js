import { useEffect, useState } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      const person = persons.find((p) => p.name === newName);

      if (
        window.confirm(
          `${newName} is already in the phone book, replace the old number?`
        )
      ) {
        personService
          .updateNumber(person.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p
              )
            );
            setSuccessMessage(
              `${personObject.name}'s number has been updated.`
            );
            setTimeout(() => setSuccessMessage(""), 3000);
          })
          .catch((error) => {
            alert(
              `Failed to update ${newName}. Perhaps they've already been removed from the server.`
            );
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      personService.create(personObject).then((returnedObject) => {
        setPersons(persons.concat(returnedObject));
        setSuccessMessage(
          `${personObject.name} has been added to the phonebook.`
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const Notification = ({ message }) => {
    if (!message) {
      return null;
    }
    return (
      <div
        style={{
          color: "green",
          backgroundColor: "#d4edda",
          padding: "10px",
          border: "1px solid green",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        {message}
      </div>
    );
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
      <Notification message={successMessage} />
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
