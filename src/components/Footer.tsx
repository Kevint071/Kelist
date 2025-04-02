import Link from "next/link"
import { RiDiscordLine, RiGithubLine, RiInstagramLine } from "react-icons/ri";
import { ExternalLink } from "lucide-react"

const socialLinks = [
  { name: "Instagram", icon: RiInstagramLine, color: "#E1306C", href: "https://instagram.com" },
  { name: "GitHub", icon: RiGithubLine, color: "#818181", href: "https://github.com" },
  { name: "Discord", icon: RiDiscordLine, color: "#5865F2", href: "https://discord.com" },
];

const navigationLinks = [
  { name: "Repo Github", href: "" },
  { name: "Repo API Github", href: "https://github.com/Kevint071/KelistAPI" },
  { name: "Acerca de", href: "/about" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 py-8 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-end group">
              <span className="text-3xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">K</span>
              <span className="text-2xl font-bold text-gray-400 group-hover:text-gray-300 transition-colors duration-300">elist</span>
            </Link>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Organiza tus tareas con estilo. Proyecto desarrollado como parte del aprendizaje en desarrollo web.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gray-300 font-semibold mb-3 text-lg">Sobre Kelist</h3>
            <ul className="flex flex-col items-center md:items-start space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://nextjs.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1"
                >
                  <span>Tecnologías</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gray-300 font-semibold mb-3 text-lg">Conéctate</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" color={social.color}/>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Kelist. Hecho con 
            <span className="inline-block mx-1 text-red-500 animate-pulse">❤️</span> 
            por <a href="https://github.com/Kevint071" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">Kevint071</a>
          </p>
          <p className="text-gray-500 text-xs mt-2 sm:mt-0">
            Proyecto de aprendizaje
          </p>
        </div>
      </div>
    </footer>
  )
}