import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchedName, setSearchedName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    if (checkExistingName(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    const nameObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    document.getElementById("phonebookForm").reset();
  }

  const checkExistingName = (name) => {
    const filteredNames = persons.filter( (person) => person.name === name)
    return filteredNames.length !== 0
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App