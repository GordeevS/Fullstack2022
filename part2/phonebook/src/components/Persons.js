const Persons = ({ persons, filter }) => {
    return (
     persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) //making everything to lowercase to avoid case sensivity
     .map(person => <p key = {person.id}> {person.name} {person.number}</p>)
    )
  }
  
  export default Persons