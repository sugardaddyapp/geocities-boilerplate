package internal

import (
	"embed"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
)

//go:embed all:templates
var TemplateFS embed.FS

type Answers struct {
	SiteName      string
	AuthorName    string
	Theme         string
	Pages         []string
	CursorEffect  string
	FallingEffect string
	WelcomeAlert  bool
	PlayMusic     bool
	FakeHighCount bool
}

type pageInfo struct {
	key   string
	label string
	file  string
}

var allPages = []pageInfo{
	{"index",     "🏠 Home",      "index.html"},
	{"about",     "👤 About Me",   "about.html"},
	{"gallery",   "🖼️ Gallery",    "gallery.html"},
	{"guestbook", "📖 Guestbook",  "guestbook.html"},
	{"links",     "🔗 Cool Links", "links.html"},
}

var varRe = regexp.MustCompile(`\{\{(\w+)\}\}`)

func interpolate(tmpl string, vars map[string]string) string {
	return varRe.ReplaceAllStringFunc(tmpl, func(m string) string {
		key := varRe.FindStringSubmatch(m)[1]
		if v, ok := vars[key]; ok {
			return v
		}
		return m
	})
}

func buildNavLinks(pages []string, currentPage string) string {
	active := map[string]bool{"index": true}
	for _, p := range pages {
		active[p] = true
	}
	var links []string
	for _, p := range allPages {
		if !active[p.key] {
			continue
		}
		cls := "nav-link"
		if p.key == currentPage {
			cls = "nav-link nav-active"
		}
		links = append(links, fmt.Sprintf(`<a href="%s" class="%s">%s</a>`, p.file, cls, p.label))
	}
	return strings.Join(links, "\n        ")
}

func boolStr(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func Generate(outputDir string, ans *Answers) ([]string, error) {
	theme := GetTheme(ans.Theme)

	if err := os.MkdirAll(filepath.Join(outputDir, "css"), 0755); err != nil {
		return nil, err
	}
	if err := os.MkdirAll(filepath.Join(outputDir, "js"), 0755); err != nil {
		return nil, err
	}

	vars := map[string]string{
		"SITE_NAME":       ans.SiteName,
		"AUTHOR_NAME":     ans.AuthorName,
		"THEME_NAME":      theme.Name,
		"BG":              theme.Bg,
		"BG_PATTERN":      theme.BgPattern,
		"BG_SIZE":         theme.BgSize,
		"TEXT_COLOR":      theme.TextColor,
		"HEADING_COLOR":   theme.HeadingColor,
		"LINK_COLOR":      theme.LinkColor,
		"LINK_HOVER":      theme.LinkHover,
		"ACCENT_COLOR":    theme.AccentColor,
		"BORDER_LIGHT":    theme.BorderLight,
		"BORDER_DARK":     theme.BorderDark,
		"PANEL_BG":        theme.PanelBg,
		"PANEL_BORDER":    theme.PanelBorder,
		"COUNTER_BG":      theme.CounterBg,
		"COUNTER_TEXT":    theme.CounterText,
		"TABLE_BORDER":    theme.TableBorder,
		"TABLE_HEADER_BG": theme.TableHeaderBg,
		"GLOW_COLOR":      theme.GlowColor,
		"NAV_ACTIVE_BG":   theme.NavActiveBg,
		"NAV_ACTIVE_TEXT": theme.NavActiveText,
		"CURSOR_EFFECT":   ans.CursorEffect,
		"FALLING_EFFECT":  ans.FallingEffect,
		"WELCOME_ALERT":   boolStr(ans.WelcomeAlert),
		"PLAY_MUSIC":      boolStr(ans.PlayMusic),
		"FAKE_HIGH_COUNT": boolStr(ans.FakeHighCount),
		"YEAR":            fmt.Sprintf("%d", time.Now().Year()),
	}

	cssBytes, _ := TemplateFS.ReadFile("templates/css/style.css")
	os.WriteFile(filepath.Join(outputDir, "css", "style.css"), []byte(interpolate(string(cssBytes), vars)), 0644)

	jsBytes, _ := TemplateFS.ReadFile("templates/js/main.js")
	os.WriteFile(filepath.Join(outputDir, "js", "main.js"), []byte(interpolate(string(jsBytes), vars)), 0644)

	pagesToGenerate := []pageInfo{{key: "index", file: "index.html"}}
	for _, p := range ans.Pages {
		for _, pd := range allPages {
			if pd.key == p {
				pagesToGenerate = append(pagesToGenerate, pd)
				break
			}
		}
	}

	var generated []string
	for _, page := range pagesToGenerate {
		data, err := TemplateFS.ReadFile("templates/" + page.file)
		if err != nil {
			continue
		}
		nav := buildNavLinks(ans.Pages, page.key)
		pageVars := make(map[string]string, len(vars)+1)
		for k, v := range vars {
			pageVars[k] = v
		}
		pageVars["NAV_LINKS"] = nav
		html := interpolate(string(data), pageVars)
		os.WriteFile(filepath.Join(outputDir, page.file), []byte(html), 0644)
		generated = append(generated, page.file)
	}

	return generated, nil
}
