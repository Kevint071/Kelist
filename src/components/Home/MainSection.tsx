import Link from "next/link";

function MainSection() {
  return (
    <section className="lg:animate-fadeIn flex flex-col items-center gap-y-2 text-center md:mt-14">
      <h1 className="my-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-5xl font-extrabold text-transparent lg:text-7xl">
        Organiza tu Día con Facilidad
      </h1>
      <p className="mb-10 text-lg font-light text-gray-300 max-md:max-w-md md:mb-16 md:max-w-xl md:text-xl">
        Organiza, prioriza y completa tus tareas de manera eficiente
      </p>
      <div className="text-md flex max-w-md items-center justify-center gap-8 max-lg:h-[calc(var(--spacing)*18)] max-md:gap-6 md:text-lg">
        <Link
          href="/auth/registrarse"
          className="h-auto rounded-lg bg-cyan-600 px-3 py-2 font-bold text-white transition duration-300 hover:bg-blue-700 md:px-6 md:py-2"
        >
          Empieza Ya
        </Link>
        <Link
          href="https://github.com"
		  target="_blank"
          className="rounded-lg border-2 border-cyan-300 bg-transparent px-3 py-2 font-bold text-white transition duration-300 md:px-6 md:py-2"
        >
          GitHub
        </Link>
      </div>
    </section>
  );
}

export default MainSection;
