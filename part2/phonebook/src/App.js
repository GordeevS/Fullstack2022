import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addName = (event) => {
    event.preventDefault()
    const personsArray = persons.map(event => event.name) //we need mapping to go through the array of persons
    let newId = persons.length + 1  //creating id by inceasing the current number of element in the persons array by one
    const nameObject = {
      name: newName,
      number: newNumber,
      id: newId
    }
    if (personsArray.includes(`${nameObject.name}`)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      console.log(persons)
    }
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
      />
    </div>
  )
}

export default App