const COLORS = {
  black: {
    bg: "bg-slate-50/80",
    badge: "bg-black/80",
  },
} as const;

type ColorKeys = keyof typeof COLORS;
type Color = typeof COLORS[ColorKeys];

export const getRandomColor = (): Color => {
  const colorNames = Object.keys(COLORS) as ColorKeys[];
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  const randomColorName = colorNames[randomIndex];
  return COLORS[randomColorName];
};
