import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchedName, setSearchedName] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    
    if (checkExistingName(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.filter( (person) => person.name === newName)[0]
        const personUpdate = {...person, number: newPhone}
        personsService.update(person.id, personUpdate).then(updatedPerson => {
          setPersons(persons.map(p => p.id === person.id ? updatedPerson : p))
          setNewName('')
          document.getElementById("phonebookForm").reset();
        })
      }
      return
    }
    
    const nameObject = {
      name: newName,
      number: newPhone
    }

    personsService
      .create(nameObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        document.getElementById("phonebookForm").reset();
      })
  }

  const checkExistingName = (name) => {
    const filteredNames = persons.filter( (person) => person.name === name)
    return filteredNames.length !== 0
  }

  const handleDeletePerson = (id) => {
    return () => {
      const person = persons.filter(person => person.id === id)
      if (window.confirm(`Delete ${person.name}?`)) {
        personsService.deleteObject(id).then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })  
      }
    }
  }
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(searchedName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={(event) => setSearchedName(event.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        handleNameChange={(event) => setNewName(event.target.value)}
        handlePhoneChange={(event) => setNewPhone(event.target.value)}
        onSubmit={addNewName}
        />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDeletePerson} />
    </div>
  )
}

export default App