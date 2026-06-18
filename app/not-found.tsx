import Link from "next/link";
import { CashewNut } from "@/components/art";

export default function NotFound() {
  return (
    <div className="grain relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-terroir px-5">
      <div className="relative text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-2">
          <CashewNut className="h-16 w-16 -rotate-12" fill="var(--color-or)" />
          <span className="font-display text-7xl font-bold text-brun sm:text-8xl">404</span>
          <CashewNut className="h-16 w-16 rotate-12" fill="var(--color-orange)" />
        </div>
        <h1 className="font-display text-3xl font-semibold">Page introuvable</h1>
        <p className="mx-auto mt-3 max-w-md text-brun/65">
          Cette page s&apos;est égarée quelque part entre la terre et le clic.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
