require "fileutils"
require_relative "themes"

module CreateGeocitiesApp
  ALL_PAGES = [
    { key: "index",     label: "🏠 Home",      file: "index.html" },
    { key: "about",     label: "👤 About Me",   file: "about.html" },
    { key: "gallery",   label: "🖼️ Gallery",    file: "gallery.html" },
    { key: "guestbook", label: "📖 Guestbook",  file: "guestbook.html" },
    { key: "links",     label: "🔗 Cool Links", file: "links.html" },
  ].freeze

  TEMPLATE_DIR = File.expand_path("../../../templates", __FILE__)

  def self.interpolate(template, vars)
    template.gsub(/\{\{(\w+)\}\}/) { vars[$1] || vars[$1.to_sym] || "{{#{$1}}}" }.to_s
  end

  def self.build_nav_links(pages, current_page)
    active = ["index"] + pages
    ALL_PAGES.select { |p| active.include?(p[:key]) }.map do |p|
      cls = p[:key] == current_page ? "nav-link nav-active" : "nav-link"
      %(<a href="#{p[:file]}" class="#{cls}">#{p[:label]}</a>)
    end.join("\n        ")
  end

  def self.generate(output_dir, answers)
    theme = get_theme(answers[:theme])
    pages = answers[:pages] || []

    FileUtils.mkdir_p(File.join(output_dir, "css"))
    FileUtils.mkdir_p(File.join(output_dir, "js"))

    base_vars = {
      "SITE_NAME"       => answers[:site_name],
      "AUTHOR_NAME"     => answers[:author_name],
      "THEME_NAME"      => theme[:name],
      "BG"              => theme[:bg],
      "BG_PATTERN"      => theme[:bg_pattern],
      "BG_SIZE"         => theme[:bg_size],
      "TEXT_COLOR"      => theme[:text_color],
      "HEADING_COLOR"   => theme[:heading_color],
      "LINK_COLOR"      => theme[:link_color],
      "LINK_HOVER"      => theme[:link_hover],
      "ACCENT_COLOR"    => theme[:accent_color],
      "BORDER_LIGHT"    => theme[:border_light],
      "BORDER_DARK"     => theme[:border_dark],
      "PANEL_BG"        => theme[:panel_bg],
      "PANEL_BORDER"    => theme[:panel_border],
      "COUNTER_BG"      => theme[:counter_bg],
      "COUNTER_TEXT"    => theme[:counter_text],
      "TABLE_BORDER"    => theme[:table_border],
      "TABLE_HEADER_BG" => theme[:table_header_bg],
      "GLOW_COLOR"      => theme[:glow_color],
      "NAV_ACTIVE_BG"   => theme[:nav_active_bg],
      "NAV_ACTIVE_TEXT" => theme[:nav_active_text],
      "CURSOR_EFFECT"   => answers[:cursor_effect] || "none",
      "FALLING_EFFECT"  => answers[:falling_effect] || "none",
      "WELCOME_ALERT"   => answers[:welcome_alert] ? "true" : "false",
      "PLAY_MUSIC"      => answers[:play_music] ? "true" : "false",
      "FAKE_HIGH_COUNT" => answers[:fake_high_count] ? "true" : "false",
      "YEAR"            => Time.now.year.to_s,
    }

    css_src = File.read(File.join(TEMPLATE_DIR, "css", "style.css"))
    File.write(File.join(output_dir, "css", "style.css"), interpolate(css_src, base_vars))

    js_src = File.read(File.join(TEMPLATE_DIR, "js", "main.js"))
    File.write(File.join(output_dir, "js", "main.js"), interpolate(js_src, base_vars))

    pages_to_generate = [{ key: "index", file: "index.html" }] +
      pages.map { |p| { key: p, file: "#{p}.html" } }

    generated = []
    pages_to_generate.each do |page|
      tmpl = File.join(TEMPLATE_DIR, page[:file])
      next unless File.exist?(tmpl)

      nav  = build_nav_links(pages, page[:key])
      html = interpolate(File.read(tmpl), base_vars.merge("NAV_LINKS" => nav))
      File.write(File.join(output_dir, page[:file]), html)
      generated << page[:file]
    end

    generated
  end
end
