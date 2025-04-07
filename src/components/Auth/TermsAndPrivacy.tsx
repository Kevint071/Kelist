import Link from "next/link";

type TermsAndPrivacyNoticeProps = {
  message?: string;
};

const TermsAndPrivacyNotice = ({ message = "Al registrarte, aceptas nuestros" }: TermsAndPrivacyNoticeProps) => {
  return (
    <div className="mt-4 text-center font-semibold">
      <p className="text-xs font-semibold text-gray-400">
        {message}{" "}
        <Link href="/terms" className="text-cyan-400 hover:text-cyan-400">
          Términos
        </Link>{" "}
        y{" "}
        <Link href="/privacy" className="text-cyan-400 hover:text-cyan-400">
          Política de Privacidad
        </Link>
      </p>
    </div>
  );
};

export default TermsAndPrivacyNotice;
