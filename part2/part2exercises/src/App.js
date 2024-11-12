import Course from "./component/Course.js";

const App = ({ course }) => {
  console.log(course);

  return <Course course={course} />;
};

export default App;
