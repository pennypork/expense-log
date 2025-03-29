// see: https://tailwindcss.com/docs/customizing-colors
import tailwindColors from "tailwindcss/colors";

export type Color = {
	name: ColorName;
	tone: ColorTone;
};

export const COLOR_NAMES = [
	"slate",
	"gray",
	"zinc",
	"neutral",
	"stone",
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"sky",
	"blue",
	"indigo",
	"violet",
	"purple",
	"fuchsia",
	"pink",
	"rose",
] as const;
export type ColorName = (typeof COLOR_NAMES)[number];

export const COLOR_TONES = [
	"50",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900",
	"950",
] as const;
export type ColorTone = (typeof COLOR_TONES)[number];

export function getColorCode(
	colorName: ColorName,
	colorTone: ColorTone,
): string {
	return tailwindColors[colorName][colorTone];
}
