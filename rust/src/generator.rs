use include_dir::{include_dir, Dir};
use regex::Regex;
use std::collections::HashMap;
use std::fs;
use std::path::Path;

use crate::themes::get_theme;

static TEMPLATES: Dir = include_dir!("$CARGO_MANIFEST_DIR/templates");

struct PageDef {
    key: &'static str,
    label: &'static str,
    file: &'static str,
}

const ALL_PAGES: &[PageDef] = &[
    PageDef { key: "index",     label: "🏠 Home",      file: "index.html" },
    PageDef { key: "about",     label: "👤 About Me",   file: "about.html" },
    PageDef { key: "gallery",   label: "🖼️ Gallery",    file: "gallery.html" },
    PageDef { key: "guestbook", label: "📖 Guestbook",  file: "guestbook.html" },
    PageDef { key: "links",     label: "🔗 Cool Links", file: "links.html" },
];

fn interpolate(template: &str, vars: &HashMap<&str, String>) -> String {
    let re = Regex::new(r"\{\{(\w+)\}\}").unwrap();
    re.replace_all(template, |caps: &regex::Captures| {
        vars.get(caps.get(1).unwrap().as_str())
            .cloned()
            .unwrap_or_else(|| caps.get(0).unwrap().as_str().to_string())
    })
    .into_owned()
}

fn build_nav_links(pages: &[String], current_page: &str) -> String {
    let active: Vec<&str> = std::iter::once("index")
        .chain(pages.iter().map(String::as_str))
        .collect();

    ALL_PAGES
        .iter()
        .filter(|p| active.contains(&p.key))
        .map(|p| {
            let cls = if p.key == current_page {
                "nav-link nav-active"
            } else {
                "nav-link"
            };
            format!(r#"<a href="{}" class="{}">{}</a>"#, p.file, cls, p.label)
        })
        .collect::<Vec<_>>()
        .join("\n        ")
}

pub fn generate(output_dir: &Path, answers: &crate::Answers) -> Vec<String> {
    let theme = get_theme(&answers.theme);
    let year = chrono::Local::now().format("%Y").to_string();

    fs::create_dir_all(output_dir.join("css")).unwrap();
    fs::create_dir_all(output_dir.join("js")).unwrap();

    let mut base_vars: HashMap<&str, String> = HashMap::new();
    base_vars.insert("SITE_NAME",        answers.site_name.clone());
    base_vars.insert("AUTHOR_NAME",      answers.author_name.clone());
    base_vars.insert("THEME_NAME",       theme.name.to_string());
    base_vars.insert("BG",               theme.bg.to_string());
    base_vars.insert("BG_PATTERN",       theme.bg_pattern.to_string());
    base_vars.insert("BG_SIZE",          theme.bg_size.to_string());
    base_vars.insert("TEXT_COLOR",       theme.text_color.to_string());
    base_vars.insert("HEADING_COLOR",    theme.heading_color.to_string());
    base_vars.insert("LINK_COLOR",       theme.link_color.to_string());
    base_vars.insert("LINK_HOVER",       theme.link_hover.to_string());
    base_vars.insert("ACCENT_COLOR",     theme.accent_color.to_string());
    base_vars.insert("BORDER_LIGHT",     theme.border_light.to_string());
    base_vars.insert("BORDER_DARK",      theme.border_dark.to_string());
    base_vars.insert("PANEL_BG",         theme.panel_bg.to_string());
    base_vars.insert("PANEL_BORDER",     theme.panel_border.to_string());
    base_vars.insert("COUNTER_BG",       theme.counter_bg.to_string());
    base_vars.insert("COUNTER_TEXT",     theme.counter_text.to_string());
    base_vars.insert("TABLE_BORDER",     theme.table_border.to_string());
    base_vars.insert("TABLE_HEADER_BG",  theme.table_header_bg.to_string());
    base_vars.insert("GLOW_COLOR",       theme.glow_color.to_string());
    base_vars.insert("NAV_ACTIVE_BG",    theme.nav_active_bg.to_string());
    base_vars.insert("NAV_ACTIVE_TEXT",  theme.nav_active_text.to_string());
    base_vars.insert("CURSOR_EFFECT",    answers.cursor_effect.clone());
    base_vars.insert("FALLING_EFFECT",   answers.falling_effect.clone());
    base_vars.insert("WELCOME_ALERT",    if answers.welcome_alert  { "true" } else { "false" }.to_string());
    base_vars.insert("PLAY_MUSIC",       if answers.play_music     { "true" } else { "false" }.to_string());
    base_vars.insert("FAKE_HIGH_COUNT",  if answers.fake_high_count{ "true" } else { "false" }.to_string());
    base_vars.insert("YEAR",             year);

    let css_src = TEMPLATES.get_file("css/style.css").unwrap().contents_utf8().unwrap();
    fs::write(output_dir.join("css/style.css"), interpolate(css_src, &base_vars)).unwrap();

    let js_src = TEMPLATES.get_file("js/main.js").unwrap().contents_utf8().unwrap();
    fs::write(output_dir.join("js/main.js"), interpolate(js_src, &base_vars)).unwrap();

    let pages_to_generate: Vec<(&str, &str)> = std::iter::once(("index", "index.html"))
        .chain(answers.pages.iter().map(|p| (p.as_str(), ALL_PAGES.iter().find(|x| x.key == p).map(|x| x.file).unwrap_or(""))))
        .filter(|(_, f)| !f.is_empty())
        .collect();

    let mut generated = Vec::new();
    for (key, file) in &pages_to_generate {
        if let Some(tmpl) = TEMPLATES.get_file(file) {
            let nav = build_nav_links(&answers.pages, key);
            let mut vars = base_vars.clone();
            vars.insert("NAV_LINKS", nav);
            let html = interpolate(tmpl.contents_utf8().unwrap(), &vars);
            fs::write(output_dir.join(file), html).unwrap();
            generated.push(file.to_string());
        }
    }

    generated
}
