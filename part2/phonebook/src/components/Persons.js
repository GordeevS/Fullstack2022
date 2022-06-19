//import personService from '../services/persons'

const Persons = ({ persons, filter, deleteName }) => {

  /* const handleClick = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(
          `the note '${name}' was already deleted from server`
        )
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  } */

    return (
     persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) //making everything to lowercase to avoid case sensivity
     .map(person => <p key = {person.id}> {person.name} {person.number} <button value = {person.id} onClick = {deleteName}>delete</button></p>)
    )
  }
  
  export default Persons