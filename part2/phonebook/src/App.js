import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    personsService
      .getAll()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])

  const cleanForm = () => {
    setNewName('')
    setNewPhone('')
  }

  const notifyWith = (message, type='info') => {
    setNotificationMessage({
      message, type
    })
    setTimeout(() => {
      setNotificationMessage({
        message: null
      })
    }, 3000)
  }

  const updateName = (person) => {
    const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

    if (ok) {
      const personUpdate = { ...person, number: newPhone }
      personsService
        .update(person.id, personUpdate)
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id === person.id ? updatedPerson : p))
          notifyWith(`Modified '${updatedPerson.name}'`)
        })
        .catch(error => {
          notifyWith(`Information of '${person.name}' has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== person.id))
        })
      
      cleanForm()
    }
  }

  const addNewName = (event) => {
    event.preventDefault()
    const person = persons.find((p) => p.name === newName)
    
    if (person) {
      updateName(person) 
      return
    }

    const newPerson = {
      name: newName,
      number: newPhone
    }

    personsService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        notifyWith(`Added '${createdPerson.name}'`)
        cleanForm()
      })
  }

  const deleteName = (person) => {
    
    const ok = window.confirm(`Delete ${person.name} from phonebook?`)
    if (ok) {
      personsService
        .deleteObject(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          notifyWith(`Deleted '${person.name}'`)
        })
        .catch(error => {
          notifyWith(`Information of '${person.name}' has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const byFilterField = 
    person => person.name.toLowerCase().includes(searchedName.toLowerCase())

  const personsToShow = searchedName ? persons.filter(byFilterField) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />
      <Filter filter={searchedName} handleFilterChange={setSearchedName} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={setNewName}
        handlePhoneChange={setNewPhone}
        onSubmit={addNewName}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={deleteName} />
    </div>
  )
  
}
export default App