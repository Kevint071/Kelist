import { MdOutlineMailOutline } from "react-icons/md";
import { ExternalLink } from "lucide-react";
import { RiGithubLine } from "react-icons/ri";
import { useVisibility } from "@/hooks/About/useVisibility";

function ContactSection() {
  const isVisible = useVisibility();
  return (
    <div
      className={`relative ${isVisible ? "fade-in-up delay-600" : "opacity-0"}`}
    >
      <div className="relative p-8 text-center">
        <h2 className="mb-6 text-2xl font-semibold text-cyan-300">
          ¿Interesado en Kelist?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-300/90">
          Este proyecto está en constante evolución. Si quieres saber más,
          explorar el código fuente o ponerte en contacto conmigo, aquí tienes
          las opciones disponibles.
        </p>
        <div className="mx-auto flex w-fit flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=andrestorrecilla.14@gmail.com&su=Proyecto%20Kelist&body=Hola,%0A%0AMe gustaría ponerme en contacto contigo para ...%0A%0AQuedo atento a tu respuesta.%0A%0ASaludos."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rounded-full border border-emerald-500/50 px-6 py-3 font-medium text-emerald-400 transition-all duration-300 hover:bg-emerald-500/10 sm:px-8"
          >
            <MdOutlineMailOutline size={20} />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/Kevint071"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rounded-full border border-cyan-500/50 px-8 py-3 font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10"
          >
            <RiGithubLine size={20} />
            <span>GitHub</span>
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
