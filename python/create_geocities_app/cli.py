#!/usr/bin/env python3
import sys
import argparse
from pathlib import Path

try:
    import questionary
except ImportError:
    print("Error: questionary is required. Run: pip install questionary", file=sys.stderr)
    sys.exit(1)

from .generator import generate

BANNER = """
\033[33m  ██████╗ ███████╗ ██████╗  ██████╗██╗████████╗██╗███████╗███████╗\033[0m
\033[33m ██╔════╝ ██╔════╝██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝\033[0m
\033[32m ██║  ███╗█████╗  ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗\033[0m
\033[32m ██║   ██║██╔══╝  ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║\033[0m
\033[36m ╚██████╔╝███████╗╚██████╔╝╚██████╗██║   ██║   ██║███████╗███████║\033[0m
\033[36m  ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝\033[0m
\033[35m         create-geocities-app  ✨  Welcome to 1996  ✨\033[0m
"""

DEFAULT_ANSWERS = {
    "site_name":     "My Geocities Site",
    "author_name":   "Webmaster",
    "theme":         "neon",
    "pages":         ["about", "gallery", "guestbook", "links"],
    "cursor_effect": "sparkle",
    "falling_effect": "stars",
    "welcome_alert": True,
    "play_music":    True,
    "fake_high_count": True,
}


def ask_questions() -> dict:
    site_name = questionary.text(
        "What is your site name?",
        default="My Awesome Homepage",
        validate=lambda v: True if v.strip() else "Site name cannot be empty",
    ).ask()
    if site_name is None:
        print("\nAborted.")
        sys.exit(1)

    author_name = questionary.text(
        "What is your name (or handle)?",
        default="Webmaster",
        validate=lambda v: True if v.strip() else "Name cannot be empty",
    ).ask()
    if author_name is None:
        print("\nAborted.")
        sys.exit(1)

    theme = questionary.select(
        "Pick a color theme:",
        choices=[
            questionary.Choice("Neon       (black bg, green + yellow + magenta)", "neon"),
            questionary.Choice("Space      (dark blue, stars, gold + cyan)",       "space"),
            questionary.Choice("Candy      (hot pink bg, cyan + yellow)",          "candy"),
            questionary.Choice("Forest     (dark green, gold accents)",            "forest"),
            questionary.Choice("Windows 95 (teal bg, grey panels)",               "windows"),
        ],
    ).ask()
    if theme is None:
        print("\nAborted.")
        sys.exit(1)

    pages = questionary.checkbox(
        "Which extra pages do you want?",
        choices=[
            questionary.Choice("About Me",  "about",     checked=True),
            questionary.Choice("Gallery",   "gallery",   checked=True),
            questionary.Choice("Guestbook", "guestbook", checked=True),
            questionary.Choice("Cool Links","links",     checked=True),
        ],
    ).ask()
    if pages is None:
        print("\nAborted.")
        sys.exit(1)

    cursor_effect = questionary.select(
        "Pick a cursor effect:",
        choices=[
            questionary.Choice("Sparkle  ✨ (glitter dots spawn at cursor)", "sparkle"),
            questionary.Choice("Star Trail ★ (stars follow and fade)",        "startrail"),
            questionary.Choice("Comet    ☄️  (colored streak trail)",         "comet"),
            questionary.Choice("Rainbow  🌈 (hue-cycling dot trail)",         "rainbow"),
            questionary.Choice("None        (no cursor effect)",               "none"),
        ],
    ).ask()
    if cursor_effect is None:
        print("\nAborted.")
        sys.exit(1)

    falling_effect = questionary.select(
        "Pick a falling background effect:",
        choices=[
            questionary.Choice("Stars  ⭐ (white dots fall from top)", "stars"),
            questionary.Choice("Snow   ❄️  (snowflakes drift down)",   "snow"),
            questionary.Choice("None     (no falling effect)",          "none"),
        ],
    ).ask()
    if falling_effect is None:
        print("\nAborted.")
        sys.exit(1)

    welcome_alert = questionary.confirm(
        "Show a welcome alert when the page loads?", default=True
    ).ask()
    if welcome_alert is None:
        print("\nAborted.")
        sys.exit(1)

    play_music = questionary.confirm(
        "Auto-play a retro 8-bit music jingle on load?", default=False
    ).ask()
    if play_music is None:
        print("\nAborted.")
        sys.exit(1)

    fake_high_count = questionary.confirm(
        "Start visitor counter at a high number (looks popular!)?", default=True
    ).ask()
    if fake_high_count is None:
        print("\nAborted.")
        sys.exit(1)

    return {
        "site_name":      site_name,
        "author_name":    author_name,
        "theme":          theme,
        "pages":          pages,
        "cursor_effect":  cursor_effect,
        "falling_effect": falling_effect,
        "welcome_alert":  welcome_alert,
        "play_music":     play_music,
        "fake_high_count": fake_high_count,
    }


def main():
    parser = argparse.ArgumentParser(description="Scaffold a Geocities-themed website")
    parser.add_argument("output", nargs="?", default="my-geocities-site",
                        help="Output directory name")
    parser.add_argument("-y", "--yes", action="store_true",
                        help="Skip prompts and use defaults")
    args = parser.parse_args()

    print(BANNER)

    output_dir = Path.cwd() / args.output
    print(f"\033[36mCreating your site in: \033[1m{output_dir}\033[0m\n")

    answers = DEFAULT_ANSWERS if args.yes else ask_questions()

    print("\033[33m\n⚙️  Generating files...\n\033[0m")

    generated = generate(output_dir, answers)

    print("\033[32m✅ Done! Your Geocities site is ready.\n\033[0m")
    print("\033[37m📁 Files created:\033[0m")
    for f in generated:
        print(f"\033[36m   └─ {args.output}/{f}\033[0m")
    print(f"\033[36m   └─ {args.output}/css/style.css\033[0m")
    print(f"\033[36m   └─ {args.output}/js/main.js\033[0m")

    print(f"""\033[33m
╔══════════════════════════════════════════════╗
║  🌐  Open {args.output}/index.html in        ║
║       your browser to see your site!         ║
║                                              ║
║  Best viewed in Netscape Navigator 4.0       ║
║  at 800×600 resolution. 😉                   ║
╚══════════════════════════════════════════════╝
\033[0m""")


if __name__ == "__main__":
    main()
