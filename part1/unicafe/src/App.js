import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const Statistics = ( {good, neutral, bad} ) => {
  const allVotes = good + neutral + bad

  const getAverage = () => 
    allVotes > 0 ? (good + (bad * -1))/allVotes : 0;

  const getPositivePercentage = () => 
    allVotes > 0 ? (good)/allVotes * 100 : 0;

  if (allVotes > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={allVotes} />
          <StatisticLine text="average" value={getAverage()} />
          <StatisticLine text="positive" value={getPositivePercentage() + " %"} />
        </tbody>
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const StatisticLine = ( {text, value} ) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App