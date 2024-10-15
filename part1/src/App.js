const Hello = (props) => {
  const name = props.name;
  const age = props.age;
  const bornYear = () => new Date().getFullYear();

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old.
      </p>
      <p>So you were probably born in {bornYear}</p>
    </div>
  );
};

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
  const name = "Musa";
  const age = 10;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Musa" age={26 + 10} />
      <Hello name="Ajibade" age={age} />
    </div>
  );
};

export default App;
