import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)


  //fetching data from db.json (via json server)
  useEffect(() => {
      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setErrorMessage(`Something went wrong during persons loading`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personsArray = persons.map(event => event.name) //we need mapping to go through the array of persons
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (personsArray.includes(`${nameObject.name}`)) {
      const oldPerson = persons.find((person) => person.name === nameObject.name)
      const changedPerson = { ...oldPerson, number: newNumber }   //copying parameters of existing person with the new number
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(oldPerson.id, changedPerson)
        .then(changedPerson => {
          setPersons(persons.map((person) => person.id !== oldPerson.id ? person : changedPerson))
          setNotificationMessage(`Person '${newName}' has been succefully updated`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Something went wrong during person '${nameObject.name}' updating`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
      setNewName('')
      setNewNumber('')
    }
    else {
      personService
      .create(nameObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNotificationMessage(`Person '${nameObject.name}' has been succefully created`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        console.log(persons)
      })
      .catch(error => {
        setErrorMessage(`Something went wrong during person '${nameObject.name}' creating`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const deleteName = (event) => {
    event.preventDefault()
    const personId = event.target.value
    /* eslint-disable */
    const personToDelete = persons.find(person => person.id == personId)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {  
      personService
      .remove(personId)
      .then(response => {
        setPersons(persons.filter(person => person.id != personId))
        setNotificationMessage(`Person '${personToDelete.name}' has been succefully deleted`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of '${personToDelete.name}' has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id != personId))
      })
    }
    /* eslint-enable */
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  } 

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification errorMessage={errorMessage} />
      <Notification notificationMessage={notificationMessage} />
      <Filter filter = {filter}
              handleFilterChange = {handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm addName = {addName}
                  newName = {newName}
                  newNumber = {newNumber}
                  handleNameChange = {handleNameChange}
                  handleNumberChange = {handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons}
               filter={filter}
               deleteName={deleteName}
      />
    </div>
  )
}

export default App