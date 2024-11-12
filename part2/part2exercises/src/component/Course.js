import Header from "./Header.js";
import Content from "./Content.js";
const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <p>Total Exercises: {totalExercises}</p>
    </div>
  );
};

export default Course;
