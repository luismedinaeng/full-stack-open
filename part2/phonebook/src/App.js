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

  const addNewName = (event) => {
    event.preventDefault()
    
    if (checkExistingName(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find( (person) => person.name === newName)
        const personUpdate = {...person, number: newPhone}
        personsService
          .update(person.id, personUpdate)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === person.id ? updatedPerson : p))
            setNewName('')
            setNewPhone('')
            setNotificationMessage({
              ...notificationMessage,
              message: `Modified '${updatedPerson.name}'`
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000)
            document.getElementById("phonebookForm").reset();
          })
          .catch(error => {
            console.log(error);
            setNotificationMessage({
              message: `Information of '${person.name}' has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotificationMessage({
                message: null,
                type: null
              })
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
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
        setNewPhone('')
        setNotificationMessage({
          ...notificationMessage,
          message: `Added '${createdPerson.name}'`
        })
        setTimeout(() => {
          setNotificationMessage({
            message: null,
            type: null
          })
        }, 2000)
        document.getElementById("phonebookForm").reset();
      })
  }

  const checkExistingName = (name) => {
    const filteredNames = persons.filter( (person) => person.name === name)
    return filteredNames.length !== 0
  }

  const handleDeletePerson = (id) => {
    return () => {
      const person = persons.find(person => person.id === id)
      if (window.confirm(`Delete ${person.name}?`)) {
        personsService
          .deleteObject(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
          })
          .catch(error => {
            console.log(error);
            setNotificationMessage({
              message: `Information of '${person.name}' has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotificationMessage({
                message: null,
                type: null
              })
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })  
      }
    }
  }
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(searchedName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />
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