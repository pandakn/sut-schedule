type CommentCardProps = {
  author: string;
  content: string;
  created: string | undefined;
};

const CommentCard = ({ author, content, created }: CommentCardProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">
            @{author}
            <span className="mx-2 ">·</span>
            <span className="font-medium text-gray-400">{created}</span>
          </h3>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default CommentCard;
