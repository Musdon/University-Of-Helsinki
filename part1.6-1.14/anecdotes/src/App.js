import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  //creating a zero filled array
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const selectedAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };
  //creating method to increase or handle voting
  const votingForAnecdote = () => {
    const voting = [...votes];
    voting[selected] += 1;
    setVotes(voting);
  };

  const indexWithMostVotes = votes.indexOf(Math.max(...votes));
  console.log(`index with most votes is ${indexWithMostVotes}`);
  const anecdoteWithMostVotes = anecdotes[indexWithMostVotes];
  console.log(`anecdote with most votes is ${anecdoteWithMostVotes}`);
  const mostVotes = votes[indexWithMostVotes];
  console.log(`most votes is ${mostVotes}`);

  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <p>
        <button onClick={votingForAnecdote}>vote</button>
        <button onClick={selectedAnecdote}>next anecdote</button>
      </p>
      <h1>Anecdote With Most Votes</h1>
      {mostVotes > 0 ? (
        <div>
          <p>{anecdoteWithMostVotes}</p>
          <p>has {mostVotes} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;
