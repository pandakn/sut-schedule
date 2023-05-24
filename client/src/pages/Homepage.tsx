import Login from "./Login";
import Schedule from "./Schedule";

const Homepage = () => {
  return (
    <div>
      <h1 className="my-5 text-3xl text-center uppercase">
        <span className="text-orange-500">Sut</span> Schedule
      </h1>
      <Login />
      <Schedule />
    </div>
  );
};

export default Homepage;
