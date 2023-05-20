import Login from "./Login";
import Schedule from "./Schedule";

const Homepage = () => {
  return (
    <div>
      <h1 className="text-3xl text-center">Schedule</h1>
      <Login />
      <Schedule />
    </div>
  );
};

export default Homepage;
