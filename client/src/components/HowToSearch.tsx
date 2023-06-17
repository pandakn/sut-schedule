import Modal from "./Modal";

type HowToSearchProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

const HowToSearch = ({ isModalOpen, toggleModal }: HowToSearchProps) => {
  return (
    <Modal
      isOpenModal={isModalOpen}
      toggleModal={toggleModal}
      title="How to Search"
      showHeader
    >
      <div className="max-w-2xl p-5">
        <ul className="px-5 space-y-4 list-disc">
          <li>
            ค้นหาวิชาที่มีรหัสขึ้นต้นด้วย 523 ป้อน{" "}
            <span className="how-to-search ">523*</span> ลงในช่องรหัสวิชา
          </li>
          <li>
            ค้นหาวิชาที่มีคำว่า english เป็นส่วนหนึ่งของชื่อวิชา ป้อน{" "}
            <span className="how-to-search ">*english* </span>
            ลงในช่องชื่อวิชา
          </li>
          <li>
            ค้นหาวิชาที่มีชื่อวิชาลงท้ายด้วย software ป้อน{" "}
            <span className="how-to-search ">*software </span>
            ลงในช่องชื่อวิชา
          </li>
          <li>
            ค้นหาวิชาที่มีรหัสขึ้นต้นด้วย 523 และมีชื่อวิชา advanced ป้อน{" "}
            <span className="how-to-search ">523*</span> ลงในช่องรหัสวิชา
            และป้อน <span className="how-to-search ">*advanced</span>{" "}
            ลงในช่องชื่อวิชา
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default HowToSearch;
