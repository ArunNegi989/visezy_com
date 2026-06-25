interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  description,
  center = true,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-16 ${
        center ? "text-center" : "text-left"
      }`}
    >
      {badge && (
        <span className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          {badge}
        </span>
      )}

      <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}