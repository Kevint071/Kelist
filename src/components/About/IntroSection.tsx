import { useVisibility } from "@/hooks/About/useVisibility";

function IntroSection() {
  const isVisible = useVisibility();
  return (
    <div className="mb-12 flex flex-col items-center">
      <div
        className={`text-center ${isVisible ? "fade-in-up delay-200" : "opacity-0"}`}
      >
        <h1 className="mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-5xl font-extrabold text-transparent">
          Sobre Kelist
        </h1>
        <p className="mx-auto max-w-2xl text-xl font-light text-cyan-200/80">
          Un proyecto personal de{" "}
          <a
            href="https://github.com/Kevint071"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Kevint071
          </a>
        </p>
      </div>
    </div>
  );
}

export default IntroSection;
