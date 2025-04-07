interface TitleFormProps {
  title: string;
  description: string;
}

function TitleForm({ title, description }: TitleFormProps) {
  return (
    <div className="mt-8 mb-10 flex flex-col gap-y-2 text-center">
      <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-4xl font-bold text-transparent">
        {title}
      </h1>
      <p className="mt-3 text-gray-300">{description}</p>
    </div>
  );
}

export default TitleForm;
