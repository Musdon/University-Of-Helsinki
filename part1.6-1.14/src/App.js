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

  function total(good, neutral, bad) {
    return good + neutral + bad;
  }
  function percentage(good, neutral, bad) {
    const totalVotes = total(good, neutral, bad);
    return totalVotes === 0 ? 0 : (good / totalVotes) * 100;
  }

  const hasFeedback = total(good, neutral, bad) > 0;

  function Statistics(props) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.good} />
            <StatisticsLine text="neutral" value={props.neutral} />
            <StatisticsLine text="bad" value={props.bad} />
            <StatisticsLine
              text="all"
              value={total(props.good, props.neutral, props.bad)}
            />
            <StatisticsLine
              text={"Percentage"}
              value={
                percentage(props.good, props.neutral, props.bad).toFixed(2) +
                "%"
              }
            />
          </tbody>
        </table>
      </div>
    );
  }

  function Button({ onClick, text }) {
    return <button onClick={onClick}>{text}</button>;
  }

  function StatisticsLine({ text, value }) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    );
  }

  return (
    <div>
      <h1> give feedback</h1>
      <Button onClick={increaseGood} text={"good"} />
      <Button onClick={increaseNeutral} text={"neutral"} />
      <Button onClick={increaseBad} text={"bad"} />
      {hasFeedback ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total()}
          percentage={percentage()}
        />
      ) : (
        <p>No feedback has been given yet</p>
      )}
    </div>
  );
}

export default App;
