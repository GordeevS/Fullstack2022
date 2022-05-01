//defining new components
const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Content = (props) => {  //we are putting an object with the following parameters as a props to the given function
  //assigning array of objects to parts through mapping
  const parts = (
    <div>
      {props.parts.map(({name, exercises}) =>
        <p key={name}>
          {name} {exercises}
        </p>
      )}
    </div>
  );
  return (
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  //summing up exercises via reduce functrion. parts is a varialbe to wich we assign array of bjects in App component
  const total = props.parts.reduce((accumulator, object) => {
    return accumulator + object.exercises;
  }, 0);
  return (
    <div>
      Number of exercises {total}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header = {course.name}/>
      <Content parts = {course.parts} />
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App