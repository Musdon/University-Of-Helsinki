const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  // const now = new Date()
  // const a = 10
  // const b = 20
  // console.log('Hello from component');
  // return (
  //   <div>
  //     <p>Hello world, it is {now.toString()}</p>
  //     <p>
  //       {a} plus {b} is {a + b}
  //     </p>
  //   </div>
  // )
  const name = 'Musa'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Musa' age={26 + 10} />
      <Hello name='Ajibade' age={age} />
    </div>
  )
}

export default App

