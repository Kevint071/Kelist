import Link from "next/link";

type AccountExistsProps = {
  question: string;
  action: string;
  href: string;
};

const AccountExists = ({ question, action, href }: AccountExistsProps) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-400">
        {question}{" "}
        <Link href={href} className="text-cyan-400 hover:text-cyan-300">
          {action}
        </Link>
      </p>
    </div>
  );
};

export default AccountExists;
