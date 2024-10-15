import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function increaseGood() {
    setGood(good + 1);
  }

  function increaseNeutral() {
    setNeutral(neutral + 1);
  }

  function increaseBad() {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1> give feedback</h1>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>

      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  );
}

export default App;
