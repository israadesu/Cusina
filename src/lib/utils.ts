const COLORS = {
  green: {
    bg: "bg-[#f4f4f4]",
    badge: "bg-[#3C3C3C]",
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
