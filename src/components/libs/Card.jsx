import clsx from "clsx";

const Card = ({ children, className = "" }) => {
  return (
    <section
      className={clsx("bg-card rounded-2xl p-3 md:p-7 space-y-7", className)}
    >
      {children}
    </section>
  );
};

export default Card;
