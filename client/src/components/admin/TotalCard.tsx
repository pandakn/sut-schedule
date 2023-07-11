type TotalCardProps = {
  title: string;
  total: number;
  icon?: React.ReactNode;
  color?: string;
};

const TotalCard = ({
  title,
  total,
  color = "#F1C27B",
  icon,
}: TotalCardProps) => (
  <div className="overflow-hidden rounded-lg shadow-xl min-w-min lg:w-80 xl:w-96">
    <div className="flex w-full">
      {/* color */}
      <div className="w-8 border" style={{ backgroundColor: color }}></div>
      {/* info */}
      <div className="flex items-center justify-between w-full px-6 py-4 ">
        <section className="flex items-center gap-x-2">
          {icon}
          <h1 className="text-lg font-semibold text-gray-900 capitalize lg:text-xl">
            {title}
          </h1>
        </section>
        <span className="text-3xl font-bold text-gray-900 lg:text-4xl">
          {total}
        </span>
      </div>
    </div>
  </div>
);

export default TotalCard;