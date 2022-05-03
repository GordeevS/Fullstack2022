import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Popular = (props) => {
  //converting to string for Math.max function
  const maxvalue = Math.max(...props.points)
  let index = 0
  if (maxvalue === 0) {
    return (
      <div>
        No votes
      </div>
    )
  }
  //finding the corresponding index in the array
  index = props.points.indexOf(maxvalue)
  console.log(index)
  return (
    <div>
      {props.anecdotes[index]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  //declare an empty array
  const vote = Array(7).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(vote)  //put the declared array to the state


  const handleRandomClick = () => {
    const random = Math.floor(Math.random() * 6) //generating a random integer between 0 and 6
    setSelected(random)
  }

  const handleVoteClick = () => {
    //making copy of points array in order not to mutate original
    const copy = [ ...points ]
    //make changes
    copy[selected] += 1
    //save changes
    setPoints(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <p>
        <Button handleClick={handleVoteClick} text='vote' />
        <Button handleClick={handleRandomClick} text='next anecdote' />
      </p>
      <Header text="Anecdote with most votes" />
      <Popular anecdotes = {anecdotes} points = {points} />
    </div>
  )
}

export default App