import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="grid min-h-screen bg-stone-50 md:grid-cols-2">
      <section className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Make space for
          <span className="mt-2 block text-amber-700">good ideas</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
          Capture your thoughts, keep important things close, and find your
          focus with a notes app that keeps it simple.
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-stone-900/10 transition hover:-translate-y-0.5"
          >
            Get started
          </Link>
        </div>
        <p className="mt-5 text-sm text-stone-500">
          Your next great idea is worth writing down.
        </p>
      </section>
      <section
        className="flex items-center justify-center px-6 pb-16 md:py-12"
      >
        <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl shadow-xl shadow-stone-900/10">
          <Image
            className="object-cover"
            fill
            sizes="(max-width: 768px) 90vw, 448px"
            alt="A visual preview for the notes app"
            src="https://cdn.shopify.com/s/files/1/1644/5247/files/Best_Notetaking_Apps_for_2026-5.jpg"
          />
        </div>
      </section>
    </main>
  );
}