type ShowExamProps = {
  date?: string;
  month?: string;
  year?: string;
  times?: string;
  room?: string;
};

const ShowExam = ({ date, month, times, year, room }: ShowExamProps) => {
  return (
    <div className="pl-2 flex gap-x-2 truncate">
      {date ? (
        <>
          <p>{date}</p>
          <p>{month}.</p>
          <p>{year}</p>
          <p>{times}</p>
          <p>{room}</p>
        </>
      ) : (
        <p>-</p>
      )}
    </div>
  );
};

export default ShowExam;
