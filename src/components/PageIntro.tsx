type Props = { eyebrow: string; title: string; description: string };

export default function PageIntro({ eyebrow, title, description }: Props) {
  return (
    <header className="max-w-3xl">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="page-title text-balance">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8">{description}</p>
    </header>
  );
}
