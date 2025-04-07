import ButtonMouse from '@/components/ui/ButtonMouse'

function CTASection() {
  return (
    <section className="my-14 flex flex-col text-center px-6">
      <h2 className="mb-4 max-lg:text-2xl font-bold text-slate-200 text-3xl">
        ¿Listo para aumentar tu productividad?
      </h2>
      <p className="mb-8 max-lg:text-lg text-gray-300 text-xl">
        Únete a miles de usuarios que ya están organizando sus vidas con nuestra
        app.
      </p>
      <ButtonMouse/>
    </section>
  );
}

export default CTASection;
