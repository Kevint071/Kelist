interface Technology {
  name: string;
  color: string;
  bg: string;
  logo: string;
  description: string;
}

const technologies: Technology[] = [
  {
    name: "C#",
    color: "text-[#A953B6]",
    bg: "bg-transparent",
    logo: "/logos/csharp.avif",
    description:
      "Lenguaje de programación orientado a objetos desarrollado por Microsoft, potente y versátil.",
  },
  {
    name: ".NET",
    color: "text-[#A91F79]",
    bg: "bg-[#681F79]",
    logo: "/logos/dotnet.avif",
    description:
      "Framework de desarrollo de Microsoft para crear aplicaciones robustas y escalables.",
  },
  {
    name: "Tailwind CSS",
    color: "text-cyan-400",
    bg: "bg-transparent",
    logo: "/logos/tailwind.avif",
    description:
      "Framework CSS utilitario para diseños personalizados sin salir del HTML.",
  },
  {
    name: "Next.js",
    color: "text-white",
    bg: "bg-black",
    logo: "/logos/nextjs.avif",
    description:
      "Framework React para sitios web modernos con renderizado del lado del servidor y estático.",
  },
  {
    name: "TypeScript",
    color: "text-[#11A4D5]",
    bg: "bg-transparent",
    logo: "/logos/typescript.avif",
    description:
      "Superconjunto de JavaScript que añade tipado estático para mejorar la calidad del código.",
  },
];

export default technologies;