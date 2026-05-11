import re
import shutil
from datetime import datetime
from importlib import resources
from pathlib import Path

from .themes import get_theme

ALL_PAGES = [
    {"key": "index",     "label": "🏠 Home",       "file": "index.html"},
    {"key": "about",     "label": "👤 About Me",    "file": "about.html"},
    {"key": "gallery",   "label": "🖼️ Gallery",     "file": "gallery.html"},
    {"key": "guestbook", "label": "📖 Guestbook",   "file": "guestbook.html"},
    {"key": "links",     "label": "🔗 Cool Links",  "file": "links.html"},
]


def _interpolate(template: str, vars: dict) -> str:
    return re.sub(r"\{\{(\w+)\}\}", lambda m: str(vars.get(m.group(1), m.group(0))), template)


def _build_nav_links(pages: list, current_page: str) -> str:
    active_keys = {"index"} | set(pages)
    links = []
    for p in ALL_PAGES:
        if p["key"] not in active_keys:
            continue
        cls = 'nav-link nav-active' if p["key"] == current_page else 'nav-link'
        links.append(f'<a href="{p["file"]}" class="{cls}">{p["label"]}</a>')
    return "\n        ".join(links)


def _template_dir() -> Path:
    try:
        ref = resources.files("create_geocities_app") / "templates"
        return Path(str(ref))
    except Exception:
        return Path(__file__).parent / "templates"


def generate(output_dir: Path, answers: dict) -> list:
    theme = get_theme(answers["theme"])
    pages = answers.get("pages", [])

    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "css").mkdir(exist_ok=True)
    (output_dir / "js").mkdir(exist_ok=True)

    base_vars = {
        "SITE_NAME":       answers["site_name"],
        "AUTHOR_NAME":     answers["author_name"],
        "THEME_NAME":      theme["name"],
        "BG":              theme["bg"],
        "BG_PATTERN":      theme["bgPattern"],
        "BG_SIZE":         theme["bgSize"],
        "TEXT_COLOR":      theme["textColor"],
        "HEADING_COLOR":   theme["headingColor"],
        "LINK_COLOR":      theme["linkColor"],
        "LINK_HOVER":      theme["linkHover"],
        "ACCENT_COLOR":    theme["accentColor"],
        "BORDER_LIGHT":    theme["borderLight"],
        "BORDER_DARK":     theme["borderDark"],
        "PANEL_BG":        theme["panelBg"],
        "PANEL_BORDER":    theme["panelBorder"],
        "COUNTER_BG":      theme["counterBg"],
        "COUNTER_TEXT":    theme["counterText"],
        "TABLE_BORDER":    theme["tableBorderColor"],
        "TABLE_HEADER_BG": theme["tableHeaderBg"],
        "GLOW_COLOR":      theme["glowColor"],
        "NAV_ACTIVE_BG":   theme["navActiveBg"],
        "NAV_ACTIVE_TEXT": theme["navActiveText"],
        "CURSOR_EFFECT":   answers.get("cursor_effect", "none"),
        "FALLING_EFFECT":  answers.get("falling_effect", "none"),
        "WELCOME_ALERT":   "true" if answers.get("welcome_alert") else "false",
        "PLAY_MUSIC":      "true" if answers.get("play_music") else "false",
        "FAKE_HIGH_COUNT": "true" if answers.get("fake_high_count") else "false",
        "YEAR":            datetime.now().year,
    }

    tdir = _template_dir()

    css_src = (tdir / "css" / "style.css").read_text(encoding="utf-8")
    (output_dir / "css" / "style.css").write_text(_interpolate(css_src, base_vars), encoding="utf-8")

    js_src = (tdir / "js" / "main.js").read_text(encoding="utf-8")
    (output_dir / "js" / "main.js").write_text(_interpolate(js_src, base_vars), encoding="utf-8")

    pages_to_generate = [{"key": "index", "file": "index.html"}] + [
        {"key": p, "file": f"{p}.html"} for p in pages
    ]

    generated = []
    for page in pages_to_generate:
        tmpl_path = tdir / page["file"]
        if not tmpl_path.exists():
            continue
        nav = _build_nav_links(pages, page["key"])
        rendered = _interpolate(tmpl_path.read_text(encoding="utf-8"), {**base_vars, "NAV_LINKS": nav})
        (output_dir / page["file"]).write_text(rendered, encoding="utf-8")
        generated.append(page["file"])

    return generated
