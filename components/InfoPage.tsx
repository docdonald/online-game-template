import Breadcrumbs from "@/components/Breadcrumbs";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function InfoPage({ eyebrow, title, description, children }: InfoPageProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <header className="border-b border-border pb-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-dim">{description}</p>
      </header>
      <div className="prose-like mt-8 space-y-8 text-ink-dim">{children}</div>
    </div>
  );
}
