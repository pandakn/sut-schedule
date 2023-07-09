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
  <div className="overflow-hidden rounded-lg shadow-xl min-w-[300px] ">
    <div className="flex w-full">
      {/* color */}
      <div className="w-8 border" style={{ backgroundColor: color }}></div>
      {/* info */}
      <div className="flex items-center justify-between w-full px-6 py-4 ">
        <section className="flex items-center gap-x-2">
          {icon}
          <h1 className="text-xl font-semibold text-gray-900 capitalize">
            {title}
          </h1>
        </section>
        <span className="text-4xl font-bold text-gray-900">{total}</span>
      </div>
    </div>
  </div>
);

export default TotalCard;
