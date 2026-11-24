import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background Image */}
      <Image
        src="/event-management.jpg"
        alt="Crowd enjoying a live event"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-20"
      />

      {/* Dark Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/65" />

      {/* Main Content */}
      <section className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">

        <h1 className="text-4xl font-bold text-white sm:text-6xl">
          Plan and manage
          <span className="mt-2 block text-amber-300">
            your events
          </span>
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-8 text-stone-100">
          Keep event details organized in one place.
        </p>

        {/* Button */}
        <div className="relative z-20 mt-6 flex items-center justify-center">
          <Link
            href="/login"
            className="inline-flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl bg-amber-400 px-8 py-4 text-base font-bold text-black shadow-lg transition-all duration-300 hover:bg-amber-300 hover:scale-105"
          >
            Get started
          </Link>
        </div>

        <p className="mt-5 text-sm text-stone-200">
          Sign in to manage your events.
        </p>

      </section>
    </main>
  );
}