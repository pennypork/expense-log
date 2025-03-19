// see: https://tailwindcss.com/docs/customizing-colors
import tailwindColors from "tailwindcss/colors";

export const COLOR_NAMES = {
	SLATE: "slate",
	GRAY: "gray",
	ZINC: "zinc",
	NEUTRAL: "neutral",
	STONE: "stone",
	RED: "red",
	ORANGE: "orange",
	AMBER: "amber",
	YELLOW: "yellow",
	LIME: "lime",
	GREEN: "green",
	EMERALD: "emerald",
	TEAL: "teal",
	CYAN: "cyan",
	SKY: "sky",
	BLUE: "blue",
	INDIGO: "indigo",
	VIOLET: "violet",
	PURPLE: "purple",
	FUCHSIA: "fuchsia",
	PINK: "pink",
	ROSE: "rose",
} as const;
export type ColorName = (typeof COLOR_NAMES)[keyof typeof COLOR_NAMES];

export const COLOR_TONES = {
	T50: 50,
	T100: 100,
	T200: 200,
	T300: 300,
	T400: 400,
	T500: 500,
	T600: 600,
	T700: 700,
	T800: 800,
	T900: 900,
	T950: 950,
} as const;
export type ColorTone = (typeof COLOR_TONES)[keyof typeof COLOR_TONES];

export function getColorCode(
	colorName: ColorName,
	colorTone: ColorTone,
): string {
	return tailwindColors[colorName][colorTone];
}
