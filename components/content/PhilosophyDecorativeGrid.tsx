type PhilosophyDecorativeGridProps = {
  className?: string;
};

const GRID_LINE = "rgb(192 237 255 / 0.55)";

export function PhilosophyDecorativeGrid({
  className = "",
}: PhilosophyDecorativeGridProps) {
  return (
    <div
      aria-hidden
      className={`relative h-full min-h-full w-full opacity-15 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px),
            linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          borderRight: `1px solid ${GRID_LINE}`,
          borderBottom: `1px solid ${GRID_LINE}`,
        }}
      />
    </div>
  );
}
