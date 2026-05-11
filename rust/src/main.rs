mod generator;
mod themes;

use console::style;
use dialoguer::{theme::ColorfulTheme, Confirm, Input, MultiSelect, Select};
use std::path::PathBuf;

pub struct Answers {
    pub site_name:      String,
    pub author_name:    String,
    pub theme:          String,
    pub pages:          Vec<String>,
    pub cursor_effect:  String,
    pub falling_effect: String,
    pub welcome_alert:  bool,
    pub play_music:     bool,
    pub fake_high_count:bool,
}

const BANNER: &str = concat!(
    "\n",
    "\x1b[33m  ██████╗ ███████╗ ██████╗  ██████╗██╗████████╗██╗███████╗███████╗\x1b[0m\n",
    "\x1b[33m ██╔════╝ ██╔════╝██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝\x1b[0m\n",
    "\x1b[32m ██║  ███╗█████╗  ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗\x1b[0m\n",
    "\x1b[32m ██║   ██║██╔══╝  ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║\x1b[0m\n",
    "\x1b[36m ╚██████╔╝███████╗╚██████╔╝╚██████╗██║   ██║   ██║███████╗███████║\x1b[0m\n",
    "\x1b[36m  ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝\x1b[0m\n",
    "\x1b[35m         create-geocities-app  ✨  Welcome to 1996  ✨\x1b[0m\n",
);

fn default_answers() -> Answers {
    Answers {
        site_name:      "My Geocities Site".into(),
        author_name:    "Webmaster".into(),
        theme:          "neon".into(),
        pages:          vec!["about".into(), "gallery".into(), "guestbook".into(), "links".into()],
        cursor_effect:  "sparkle".into(),
        falling_effect: "stars".into(),
        welcome_alert:  true,
        play_music:     true,
        fake_high_count:true,
    }
}

fn ask_questions() -> Answers {
    let theme_obj = ColorfulTheme::default();

    let site_name: String = Input::with_theme(&theme_obj)
        .with_prompt("What is your site name?")
        .default("My Awesome Homepage".into())
        .interact_text()
        .unwrap();

    let author_name: String = Input::with_theme(&theme_obj)
        .with_prompt("What is your name (or handle)?")
        .default("Webmaster".into())
        .interact_text()
        .unwrap();

    let theme_choices = &["Neon       (black bg, green + yellow + magenta)",
                           "Space      (dark blue, stars, gold + cyan)",
                           "Candy      (hot pink bg, cyan + yellow)",
                           "Forest     (dark green, gold accents)",
                           "Windows 95 (teal bg, grey panels)"];
    let theme_keys = &["neon", "space", "candy", "forest", "windows"];
    let theme_idx = Select::with_theme(&theme_obj)
        .with_prompt("Pick a color theme")
        .items(theme_choices)
        .default(0)
        .interact()
        .unwrap();
    let theme = theme_keys[theme_idx].to_string();

    let page_choices = &["About Me", "Gallery", "Guestbook", "Cool Links"];
    let page_keys    = &["about",    "gallery", "guestbook", "links"];
    let page_idxs = MultiSelect::with_theme(&theme_obj)
        .with_prompt("Which extra pages do you want?")
        .items(page_choices)
        .defaults(&[true, true, true, true])
        .interact()
        .unwrap();
    let pages: Vec<String> = page_idxs.iter().map(|&i| page_keys[i].to_string()).collect();

    let cursor_choices = &["Sparkle  ✨ (glitter dots)", "Star Trail ★", "Comet ☄️", "Rainbow 🌈", "None"];
    let cursor_keys    = &["sparkle",                    "startrail",    "comet",    "rainbow",    "none"];
    let cursor_idx = Select::with_theme(&theme_obj)
        .with_prompt("Pick a cursor effect")
        .items(cursor_choices)
        .default(0)
        .interact()
        .unwrap();

    let fall_choices = &["Stars ⭐", "Snow ❄️", "None"];
    let fall_keys    = &["stars",    "snow",    "none"];
    let fall_idx = Select::with_theme(&theme_obj)
        .with_prompt("Pick a falling background effect")
        .items(fall_choices)
        .default(0)
        .interact()
        .unwrap();

    let welcome_alert = Confirm::with_theme(&theme_obj)
        .with_prompt("Show a welcome alert when the page loads?")
        .default(true)
        .interact()
        .unwrap();

    let play_music = Confirm::with_theme(&theme_obj)
        .with_prompt("Auto-play a retro 8-bit music jingle on load?")
        .default(false)
        .interact()
        .unwrap();

    let fake_high_count = Confirm::with_theme(&theme_obj)
        .with_prompt("Start visitor counter at a high number?")
        .default(true)
        .interact()
        .unwrap();

    Answers {
        site_name,
        author_name,
        theme,
        pages,
        cursor_effect:  cursor_keys[cursor_idx].to_string(),
        falling_effect: fall_keys[fall_idx].to_string(),
        welcome_alert,
        play_music,
        fake_high_count,
    }
}

fn main() {
    let mut args = std::env::args().skip(1);
    let mut output_name = String::from("my-geocities-site");
    let mut skip = false;

    while let Some(arg) = args.next() {
        match arg.as_str() {
            "-y" | "--yes" => skip = true,
            _ if !arg.starts_with('-') => output_name = arg,
            _ => {}
        }
    }

    println!("{}", BANNER);

    let output_dir: PathBuf = std::env::current_dir().unwrap().join(&output_name);
    println!("{} {}\n",
        style("Creating your site in:").cyan(),
        style(&output_dir.display()).white().bold());

    let answers = if skip { default_answers() } else { ask_questions() };

    println!("\n{}", style("⚙️  Generating files...").yellow());

    let generated = generator::generate(&output_dir, &answers);

    println!("\n{}", style("✅ Done! Your Geocities site is ready.").green());
    println!("{}", style("📁 Files created:").white());
    for f in &generated {
        println!("   {} {}/{}", style("└─").cyan(), output_name, style(f).cyan());
    }
    println!("   {} {}/css/style.css", style("└─").cyan(), output_name);
    println!("   {} {}/js/main.js\n", style("└─").cyan(), output_name);

    println!("{}", style(format!(
        "╔══════════════════════════════════════════════╗\n\
         ║  🌐  Open {}/index.html in        ║\n\
         ║       your browser to see your site!         ║\n\
         ║                                              ║\n\
         ║  Best viewed in Netscape Navigator 4.0       ║\n\
         ║  at 800×600 resolution. 😉                   ║\n\
         ╚══════════════════════════════════════════════╝",
        output_name
    )).yellow());
}
