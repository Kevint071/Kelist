import Link from "next/link";
import { RiDiscordLine, RiGithubLine, RiInstagramLine } from "react-icons/ri";
import { ExternalLink } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: RiInstagramLine,
    color: "#E1306C",
    href: "hhttps://www.instagram.com/_kevin071/",
    tooltipText: "_kevin071",
  },
  {
    name: "GitHub",
    icon: RiGithubLine,
    color: "#818181",
    href: "https://github.com/Kevint071",
    tooltipText: "Kevint071",
  },
  {
    name: "Discord",
    icon: RiDiscordLine,
    color: "#5865F2",
    href: "https://discord.com",
    tooltipText: ".andrestorrem",
  },
];

const navigationLinks = [
  { name: "Repositorio Frontend Github", href: "https://github.com/Kevint071/Kelist" },
  { name: "Repositorio API Github", href: "https://github.com/Kevint071/KelistAPI" },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-800 bg-gray-950 py-8 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <Link href="/" className="group inline-flex items-end">
              <span className="text-3xl font-bold text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300">
                K
              </span>
              <span className="text-2xl font-bold text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                elist
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-gray-400">
              Organiza tus tareas con estilo. Proyecto desarrollado como parte
              del aprendizaje en desarrollo web.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-3 text-lg font-semibold text-gray-300">
              Repositorios
            </h3>
            <ul className="flex flex-col items-center space-y-2 md:items-start">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 transition-colors duration-200 hover:text-cyan-400"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-3 text-lg font-semibold text-gray-300">
              Conéctate
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transform text-gray-400 transition-all duration-200 hover:scale-110 hover:text-cyan-400"
                  aria-label={social.name}
                  data-tooltip={social.tooltipText} // Se usa el atributo personalizado
                >
                  <social.icon className="h-6 w-6" color={social.color} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform rounded-md bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {social.tooltipText}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Kelist. Hecho con
            <span className="mx-1 inline-block animate-pulse text-red-500">
              ❤️
            </span>
            por{" "}
            <a
              href="https://github.com/Kevint071"
              className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
            >
              Kevint071
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500 sm:mt-0">
            Proyecto de aprendizaje
          </p>
        </div>
      </div>
    </footer>
  );
}
