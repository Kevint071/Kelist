import ButtonMouse from '@/components/ui/ButtonMouse'

function CTASection() {
  return (
    <section className="my-14 flex flex-col text-center">
      <h2 className="mb-4 text-2xl font-bold text-slate-300 sm:text-3xl">
        ¿Listo para aumentar tu productividad?
      </h2>
      <p className="mb-8 text-lg text-gray-300 sm:text-xl">
        Únete a miles de usuarios que ya están organizando sus vidas con nuestra
        app.
      </p>
      <ButtonMouse/>
    </section>
  );
}

export default CTASection;
