const Title = ({ firstText = "FIRST-TEXT", secondText = "SECOND-TEXT" }) => {
  return (
    <div className="inline-flex items-baseline gap-2 my-2 text-gray-500">
      <h2 className="flex gap-2 leading-none">
        {firstText}
        <span className="text-gray-700 font-medium">{secondText}</span>
      </h2>
      <span className="w-8 h-px sm:w-12 sm:h-0.5 self-center bg-gray-400" />
    </div>
  );
};

export default Title;
