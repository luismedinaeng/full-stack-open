const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {

  const getTotalExcercises = () => {
    const exercises = parts.map( (part) => part.exercises)
    return exercises.reduce((totalSum, actualValue) => totalSum + actualValue)
  }

  return (
  <>
    {parts.map((part) => <Part key={part.id} part={part} />)}
    <Total sum={getTotalExcercises()} />
  </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />  
    </>
  )
  
}

export default Course