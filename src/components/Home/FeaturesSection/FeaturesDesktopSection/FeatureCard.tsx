interface FeatureIconProps {
  type: React.ElementType;
  props: React.SVGProps<SVGSVGElement>;
}

interface Feature {
  icon: FeatureIconProps;
  title: string;
  description: string;
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#4A90E2] to-[#A259FF] opacity-20 blur-2xl"></div>
      <div className="relative rounded-3xl border border-gray-800 bg-[#0A0B14] p-8 shadow-2xl">
        <div className="flex flex-row items-center gap-4">
          <feature.icon.type
            {...feature.icon.props}
            className="mb-6 h-16 w-16 text-[#4A90E2]"
            strokeWidth={1.5}
          />
          <h3 className="mb-4 text-3xl font-semibold text-white">
            {feature.title}
          </h3>
        </div>

        <p className="text-lg leading-relaxed text-gray-400">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
