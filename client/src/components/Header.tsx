type HeaderProp = {
  toggleModal: () => void;
  studyPlanName: string;
};

const Header = ({ studyPlanName, toggleModal }: HeaderProp) => {
  return (
    <header className="container flex flex-col items-center justify-between gap-3 p-5 mx-auto mt-4 md:flex-row">
      <h3 className="text-xl text-gray-600 md:text-4xl">{studyPlanName}</h3>
      <button
        className="px-4 py-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        onClick={toggleModal}
      >
        Choose a plan
      </button>
    </header>
  );
};

export default Header;
