import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Statistics = (props) => {
  //all the calculation moved to the statistics component
  const all = props.allClicks
  const average = props.average
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const averageCalc = average/all
  const positive = good*100/all
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>{/*wrap into table, because our StatisticsLine component return tbody*/}
      <StatisticLine text = "good" value = {good}/>
      <StatisticLine text = "neutral" value = {neutral}/>
      <StatisticLine text = "bad" value = {bad}/>
      <StatisticLine text = "all" value = {all}/>
      <StatisticLine text = "average" value = {averageCalc}/>
      <StatisticLine text = "positive" value = {positive}/>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tbody>{/*wrap into tbody, because our StatisticsLine component uses table structure*/}
        <tr>
          <td style = {{"paddingRight": "5px"}}>{text}</td>
          <td style = {{"paddingLeft": "5px"}}>{value} %</td>
        </tr>
      </tbody>
    )
  }
  return (
    <tbody>
      <tr>
        <td style = {{"paddingRight": "5px"}}>{text}</td>
        <td style = {{"paddingLeft": "5px"}}>{value}</td>
      </tr>
   </tbody>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const header1 = "give feedback"
  const header2 = "statistics"

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  //for clicks handle
  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
    setAverage(average + 0)
  }

  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <Header header = {header1}/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header header = {header2}/>
      <Statistics allClicks = {allClicks}
                  average = {average}
                  good = {good}
                  neutral = {neutral}
                  bad = {bad}
      />
    </div>
  )
}

export default App
