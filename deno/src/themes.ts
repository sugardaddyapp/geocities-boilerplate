export interface Theme {
  name: string;
  bg: string;
  bgPattern: string;
  bgSize: string;
  textColor: string;
  headingColor: string;
  linkColor: string;
  linkHover: string;
  accentColor: string;
  borderLight: string;
  borderDark: string;
  panelBg: string;
  panelBorder: string;
  counterBg: string;
  counterText: string;
  tableBorderColor: string;
  tableHeaderBg: string;
  glowColor: string;
  navActiveBg: string;
  navActiveText: string;
}

const themes: Record<string, Theme> = {
  neon: {
    name: "Neon", bg: "#000000",
    bgPattern: "radial-gradient(circle, #001100 1px, transparent 1px)",
    bgSize: "20px 20px", textColor: "#00FF00", headingColor: "#FFFF00",
    linkColor: "#FF00FF", linkHover: "#00FFFF", accentColor: "#00FFFF",
    borderLight: "#00FF00", borderDark: "#003300", panelBg: "#001100",
    panelBorder: "#00FF00", counterBg: "#000000", counterText: "#00FF00",
    tableBorderColor: "#00FF00", tableHeaderBg: "#003300", glowColor: "#00FF00",
    navActiveBg: "#00FF00", navActiveText: "#000000",
  },
  space: {
    name: "Space", bg: "#000033",
    bgPattern: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
    bgSize: "30px 30px", textColor: "#CCCCFF", headingColor: "#FFDD00",
    linkColor: "#00FFFF", linkHover: "#FF6600", accentColor: "#FF6600",
    borderLight: "#6666FF", borderDark: "#000022", panelBg: "#000055",
    panelBorder: "#6666FF", counterBg: "#000022", counterText: "#00FFFF",
    tableBorderColor: "#6666FF", tableHeaderBg: "#000055", glowColor: "#6666FF",
    navActiveBg: "#FFDD00", navActiveText: "#000033",
  },
  candy: {
    name: "Candy", bg: "#FF69B4",
    bgPattern: "repeating-linear-gradient(45deg, #FF1493 0px, #FF1493 2px, #FF69B4 2px, #FF69B4 20px)",
    bgSize: "auto", textColor: "#FFFFFF", headingColor: "#FFFF00",
    linkColor: "#00FFFF", linkHover: "#FF1493", accentColor: "#FF1493",
    borderLight: "#FFFFFF", borderDark: "#CC0066", panelBg: "#FF1493",
    panelBorder: "#FFFFFF", counterBg: "#CC0066", counterText: "#FFFF00",
    tableBorderColor: "#FFFFFF", tableHeaderBg: "#FF1493", glowColor: "#FFFFFF",
    navActiveBg: "#FFFF00", navActiveText: "#CC0066",
  },
  forest: {
    name: "Forest", bg: "#003300",
    bgPattern: "repeating-linear-gradient(0deg, #002200 0px, #002200 1px, #003300 1px, #003300 20px)",
    bgSize: "auto", textColor: "#CCFFCC", headingColor: "#FFDD00",
    linkColor: "#99FF99", linkHover: "#FF6600", accentColor: "#FF6600",
    borderLight: "#66FF66", borderDark: "#001100", panelBg: "#002200",
    panelBorder: "#66FF66", counterBg: "#001100", counterText: "#99FF99",
    tableBorderColor: "#66FF66", tableHeaderBg: "#002200", glowColor: "#66FF66",
    navActiveBg: "#FFDD00", navActiveText: "#002200",
  },
  windows: {
    name: "Windows 95", bg: "#008080",
    bgPattern: "none", bgSize: "auto",
    textColor: "#000000", headingColor: "#000080",
    linkColor: "#000080", linkHover: "#FF0000", accentColor: "#000080",
    borderLight: "#FFFFFF", borderDark: "#808080", panelBg: "#C0C0C0",
    panelBorder: "#808080", counterBg: "#000080", counterText: "#FFFFFF",
    tableBorderColor: "#808080", tableHeaderBg: "#000080", glowColor: "#000080",
    navActiveBg: "#000080", navActiveText: "#FFFFFF",
  },
};

export function getTheme(name: string): Theme {
  return themes[name] ?? themes["neon"];
}

export const THEME_CHOICES = [
  { label: "Neon       (black bg, green + yellow + magenta)", value: "neon" },
  { label: "Space      (dark blue, stars, gold + cyan)",       value: "space" },
  { label: "Candy      (hot pink bg, cyan + yellow)",          value: "candy" },
  { label: "Forest     (dark green, gold accents)",            value: "forest" },
  { label: "Windows 95 (teal bg, grey panels)",               value: "windows" },
];
