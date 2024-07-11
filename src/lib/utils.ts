const COLORS = {
  green: {
    bg: "bg-[#f4f4f4]",
    badge: "bg-[#3C3C3C]",
  },
 
} as const;

type ColorKeys = keyof typeof COLORS;
type Color = typeof COLORS[ColorKeys];

export const getRandomColor = (): Color => {
  const colorNames = Object.keys(COLORS) as ColorKeys[]; // Get array of the keys (color names)
  const randomIndex = Math.floor(Math.random() * colorNames.length); // Get a random index
  const randomColorName = colorNames[randomIndex]; // Get the color name at the random index
  return COLORS[randomColorName]; // Return the color object corresponding to the random color name
};
