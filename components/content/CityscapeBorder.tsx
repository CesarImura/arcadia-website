const skylinePattern = [
  128, 69, 100, 100, 100, 100, 100, 129, 69, 69, 69, 69, 100, 29, 29, 29, 29, 29,
  69, 100, 69, 128, 69, 100, 63, 63, 63, 156, 106, 53, 63, 63, 63, 63, 68, 45, 45,
  45, 53, 55, 53, 68, 159, 159, 213, 213,
];

export function CityscapeBorder() {
  return (
    <div
      className="flex h-[129px] w-full items-end overflow-hidden"
      aria-hidden
    >
      <div className="flex min-w-full items-end gap-0 px-0">
        {skylinePattern.map((height, index) => {
          const width =
            height >= 150 ? 156 : height >= 100 ? 106 : height >= 69 ? 63 : 50;

          return (
            <div
              key={`${height}-${index}`}
              className="shrink-0 bg-[#d4d7d8]"
              style={{
                width: `${Math.min(width, 80)}px`,
                height: `${height}px`,
              }}
            />
          );
        })}
        {skylinePattern.map((height, index) => {
          const width =
            height >= 150 ? 156 : height >= 100 ? 106 : height >= 69 ? 63 : 50;

          return (
            <div
              key={`mirror-${height}-${index}`}
              className="shrink-0 bg-[#d4d7d8]"
              style={{
                width: `${Math.min(width, 80)}px`,
                height: `${height}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
