package internal

type Theme struct {
	Name          string
	Bg            string
	BgPattern     string
	BgSize        string
	TextColor     string
	HeadingColor  string
	LinkColor     string
	LinkHover     string
	AccentColor   string
	BorderLight   string
	BorderDark    string
	PanelBg       string
	PanelBorder   string
	CounterBg     string
	CounterText   string
	TableBorder   string
	TableHeaderBg string
	GlowColor     string
	NavActiveBg   string
	NavActiveText string
}

var themes = map[string]Theme{
	"neon": {
		Name: "Neon", Bg: "#000000",
		BgPattern: "radial-gradient(circle, #001100 1px, transparent 1px)", BgSize: "20px 20px",
		TextColor: "#00FF00", HeadingColor: "#FFFF00", LinkColor: "#FF00FF", LinkHover: "#00FFFF",
		AccentColor: "#00FFFF", BorderLight: "#00FF00", BorderDark: "#003300", PanelBg: "#001100",
		PanelBorder: "#00FF00", CounterBg: "#000000", CounterText: "#00FF00",
		TableBorder: "#00FF00", TableHeaderBg: "#003300", GlowColor: "#00FF00",
		NavActiveBg: "#00FF00", NavActiveText: "#000000",
	},
	"space": {
		Name: "Space", Bg: "#000033",
		BgPattern: "radial-gradient(circle, #ffffff 1px, transparent 1px)", BgSize: "30px 30px",
		TextColor: "#CCCCFF", HeadingColor: "#FFDD00", LinkColor: "#00FFFF", LinkHover: "#FF6600",
		AccentColor: "#FF6600", BorderLight: "#6666FF", BorderDark: "#000022", PanelBg: "#000055",
		PanelBorder: "#6666FF", CounterBg: "#000022", CounterText: "#00FFFF",
		TableBorder: "#6666FF", TableHeaderBg: "#000055", GlowColor: "#6666FF",
		NavActiveBg: "#FFDD00", NavActiveText: "#000033",
	},
	"candy": {
		Name: "Candy", Bg: "#FF69B4",
		BgPattern: "repeating-linear-gradient(45deg, #FF1493 0px, #FF1493 2px, #FF69B4 2px, #FF69B4 20px)", BgSize: "auto",
		TextColor: "#FFFFFF", HeadingColor: "#FFFF00", LinkColor: "#00FFFF", LinkHover: "#FF1493",
		AccentColor: "#FF1493", BorderLight: "#FFFFFF", BorderDark: "#CC0066", PanelBg: "#FF1493",
		PanelBorder: "#FFFFFF", CounterBg: "#CC0066", CounterText: "#FFFF00",
		TableBorder: "#FFFFFF", TableHeaderBg: "#FF1493", GlowColor: "#FFFFFF",
		NavActiveBg: "#FFFF00", NavActiveText: "#CC0066",
	},
	"forest": {
		Name: "Forest", Bg: "#003300",
		BgPattern: "repeating-linear-gradient(0deg, #002200 0px, #002200 1px, #003300 1px, #003300 20px)", BgSize: "auto",
		TextColor: "#CCFFCC", HeadingColor: "#FFDD00", LinkColor: "#99FF99", LinkHover: "#FF6600",
		AccentColor: "#FF6600", BorderLight: "#66FF66", BorderDark: "#001100", PanelBg: "#002200",
		PanelBorder: "#66FF66", CounterBg: "#001100", CounterText: "#99FF99",
		TableBorder: "#66FF66", TableHeaderBg: "#002200", GlowColor: "#66FF66",
		NavActiveBg: "#FFDD00", NavActiveText: "#002200",
	},
	"windows": {
		Name: "Windows 95", Bg: "#008080",
		BgPattern: "none", BgSize: "auto",
		TextColor: "#000000", HeadingColor: "#000080", LinkColor: "#000080", LinkHover: "#FF0000",
		AccentColor: "#000080", BorderLight: "#FFFFFF", BorderDark: "#808080", PanelBg: "#C0C0C0",
		PanelBorder: "#808080", CounterBg: "#000080", CounterText: "#FFFFFF",
		TableBorder: "#808080", TableHeaderBg: "#000080", GlowColor: "#000080",
		NavActiveBg: "#000080", NavActiveText: "#FFFFFF",
	},
}

func GetTheme(name string) Theme {
	if t, ok := themes[name]; ok {
		return t
	}
	return themes["neon"]
}
