export type ColorType = "grayLight" | "black" | "default";

const colorPallete = {
  grayLight: "#d0d6dd",
  black: "#11142d",
  default: "#383b56",
};

export function getColor(colorName: ColorType): string {
  return colorPallete[colorName] || colorPallete.black;
}
