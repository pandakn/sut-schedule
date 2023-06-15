import ScrollTopButton from "./ScrollTopButton";

export const Footer = () => {
  return (
    <footer className="absolute left-0 w-full -bottom-32 bg-slate-600">
      <div className="flex items-center justify-center h-28 md:h-32">
        <h1 className="tracking-wider text-center text-white md:text-xl text">
          Made by{" "}
          <a
            href="https://github.com/pandakn"
            target="_blank"
            className="hover:underline"
          >
            Natthawut Klangyod
          </a>
        </h1>
        <ScrollTopButton />
      </div>
    </footer>
  );
};
