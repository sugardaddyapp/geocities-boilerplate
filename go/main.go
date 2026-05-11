package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/charmbracelet/huh"
	"github.com/sugardaddyapp/geocities-boilerplate/go/internal"
)

const banner = "\n" +
	"\x1b[33m  ██████╗ ███████╗ ██████╗  ██████╗██╗████████╗██╗███████╗███████╗\x1b[0m\n" +
	"\x1b[33m ██╔════╝ ██╔════╝██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝\x1b[0m\n" +
	"\x1b[32m ██║  ███╗█████╗  ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗\x1b[0m\n" +
	"\x1b[32m ██║   ██║██╔══╝  ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║\x1b[0m\n" +
	"\x1b[36m ╚██████╔╝███████╗╚██████╔╝╚██████╗██║   ██║   ██║███████╗███████║\x1b[0m\n" +
	"\x1b[36m  ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝\x1b[0m\n" +
	"\x1b[35m         create-geocities-app  ✨  Welcome to 1996  ✨\x1b[0m\n"

func defaultAnswers() *internal.Answers {
	return &internal.Answers{
		SiteName:      "My Geocities Site",
		AuthorName:    "Webmaster",
		Theme:         "neon",
		Pages:         []string{"about", "gallery", "guestbook", "links"},
		CursorEffect:  "sparkle",
		FallingEffect: "stars",
		WelcomeAlert:  true,
		PlayMusic:     true,
		FakeHighCount: true,
	}
}

func askQuestions() (*internal.Answers, error) {
	ans := &internal.Answers{}

	var themeVal    string
	var cursorVal   string
	var fallingVal  string
	var pagesVals   []string

	form := huh.NewForm(
		huh.NewGroup(
			huh.NewInput().
				Title("What is your site name?").
				Placeholder("My Awesome Homepage").
				Value(&ans.SiteName),
			huh.NewInput().
				Title("What is your name (or handle)?").
				Placeholder("Webmaster").
				Value(&ans.AuthorName),
		),
		huh.NewGroup(
			huh.NewSelect[string]().
				Title("Pick a color theme:").
				Options(
					huh.NewOption("Neon       (black bg, green + yellow + magenta)", "neon"),
					huh.NewOption("Space      (dark blue, stars, gold + cyan)",       "space"),
					huh.NewOption("Candy      (hot pink bg, cyan + yellow)",          "candy"),
					huh.NewOption("Forest     (dark green, gold accents)",            "forest"),
					huh.NewOption("Windows 95 (teal bg, grey panels)",               "windows"),
				).
				Value(&themeVal),
		),
		huh.NewGroup(
			huh.NewMultiSelect[string]().
				Title("Which extra pages do you want?").
				Options(
					huh.NewOption("About Me",   "about"),
					huh.NewOption("Gallery",    "gallery"),
					huh.NewOption("Guestbook",  "guestbook"),
					huh.NewOption("Cool Links", "links"),
				).
				Value(&pagesVals),
		),
		huh.NewGroup(
			huh.NewSelect[string]().
				Title("Pick a cursor effect:").
				Options(
					huh.NewOption("Sparkle  ✨ (glitter dots)", "sparkle"),
					huh.NewOption("Star Trail ★",               "startrail"),
					huh.NewOption("Comet    ☄️",                "comet"),
					huh.NewOption("Rainbow  🌈",               "rainbow"),
					huh.NewOption("None",                       "none"),
				).
				Value(&cursorVal),
			huh.NewSelect[string]().
				Title("Pick a falling background effect:").
				Options(
					huh.NewOption("Stars  ⭐", "stars"),
					huh.NewOption("Snow   ❄️", "snow"),
					huh.NewOption("None",      "none"),
				).
				Value(&fallingVal),
		),
		huh.NewGroup(
			huh.NewConfirm().
				Title("Show a welcome alert when the page loads?").
				Value(&ans.WelcomeAlert),
			huh.NewConfirm().
				Title("Auto-play a retro 8-bit music jingle on load?").
				Value(&ans.PlayMusic),
			huh.NewConfirm().
				Title("Start visitor counter at a high number?").
				Value(&ans.FakeHighCount),
		),
	)

	if err := form.Run(); err != nil {
		return nil, err
	}

	ans.Theme         = themeVal
	ans.Pages         = pagesVals
	ans.CursorEffect  = cursorVal
	ans.FallingEffect = fallingVal
	return ans, nil
}

func main() {
	outputName := "my-geocities-site"
	skipPrompts := false

	for _, arg := range os.Args[1:] {
		switch arg {
		case "-y", "--yes":
			skipPrompts = true
		default:
			if !strings.HasPrefix(arg, "-") {
				outputName = arg
			}
		}
	}

	cwd, _ := os.Getwd()
	outputDir := filepath.Join(cwd, outputName)

	fmt.Print(banner)
	fmt.Printf("\x1b[36mCreating your site in: \x1b[1m%s\x1b[0m\n\n", outputDir)

	var ans *internal.Answers
	var err error

	if skipPrompts {
		ans = defaultAnswers()
	} else {
		ans, err = askQuestions()
		if err != nil {
			fmt.Fprintf(os.Stderr, "\nAborted: %v\n", err)
			os.Exit(1)
		}
	}

	fmt.Println("\x1b[33m\n⚙️  Generating files...\n\x1b[0m")

	generated, err := internal.Generate(outputDir, ans)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("\x1b[32m✅ Done! Your Geocities site is ready.\n\x1b[0m")
	fmt.Println("\x1b[37m📁 Files created:\x1b[0m")
	for _, f := range generated {
		fmt.Printf("\x1b[36m   └─ %s/%s\x1b[0m\n", outputName, f)
	}
	fmt.Printf("\x1b[36m   └─ %s/css/style.css\x1b[0m\n", outputName)
	fmt.Printf("\x1b[36m   └─ %s/js/main.js\x1b[0m\n\n", outputName)

	fmt.Printf("\x1b[33m"+
		"╔══════════════════════════════════════════════╗\n"+
		"║  🌐  Open %s/index.html in        ║\n"+
		"║       your browser to see your site!         ║\n"+
		"║                                              ║\n"+
		"║  Best viewed in Netscape Navigator 4.0       ║\n"+
		"║  at 800×600 resolution. 😉                   ║\n"+
		"╚══════════════════════════════════════════════╝\n"+
		"\x1b[0m\n", outputName)
}
