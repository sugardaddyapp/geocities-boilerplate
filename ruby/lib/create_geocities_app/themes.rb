module CreateGeocitiesApp
  THEMES = {
    "neon" => {
      bg: "#000000", bg_pattern: "radial-gradient(circle, #001100 1px, transparent 1px)",
      bg_size: "20px 20px", text_color: "#00FF00", heading_color: "#FFFF00",
      link_color: "#FF00FF", link_hover: "#00FFFF", accent_color: "#00FFFF",
      border_light: "#00FF00", border_dark: "#003300", panel_bg: "#001100",
      panel_border: "#00FF00", counter_bg: "#000000", counter_text: "#00FF00",
      table_border: "#00FF00", table_header_bg: "#003300", glow_color: "#00FF00",
      nav_active_bg: "#00FF00", nav_active_text: "#000000", name: "Neon",
    },
    "space" => {
      bg: "#000033", bg_pattern: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
      bg_size: "30px 30px", text_color: "#CCCCFF", heading_color: "#FFDD00",
      link_color: "#00FFFF", link_hover: "#FF6600", accent_color: "#FF6600",
      border_light: "#6666FF", border_dark: "#000022", panel_bg: "#000055",
      panel_border: "#6666FF", counter_bg: "#000022", counter_text: "#00FFFF",
      table_border: "#6666FF", table_header_bg: "#000055", glow_color: "#6666FF",
      nav_active_bg: "#FFDD00", nav_active_text: "#000033", name: "Space",
    },
    "candy" => {
      bg: "#FF69B4", bg_pattern: "repeating-linear-gradient(45deg, #FF1493 0px, #FF1493 2px, #FF69B4 2px, #FF69B4 20px)",
      bg_size: "auto", text_color: "#FFFFFF", heading_color: "#FFFF00",
      link_color: "#00FFFF", link_hover: "#FF1493", accent_color: "#FF1493",
      border_light: "#FFFFFF", border_dark: "#CC0066", panel_bg: "#FF1493",
      panel_border: "#FFFFFF", counter_bg: "#CC0066", counter_text: "#FFFF00",
      table_border: "#FFFFFF", table_header_bg: "#FF1493", glow_color: "#FFFFFF",
      nav_active_bg: "#FFFF00", nav_active_text: "#CC0066", name: "Candy",
    },
    "forest" => {
      bg: "#003300", bg_pattern: "repeating-linear-gradient(0deg, #002200 0px, #002200 1px, #003300 1px, #003300 20px)",
      bg_size: "auto", text_color: "#CCFFCC", heading_color: "#FFDD00",
      link_color: "#99FF99", link_hover: "#FF6600", accent_color: "#FF6600",
      border_light: "#66FF66", border_dark: "#001100", panel_bg: "#002200",
      panel_border: "#66FF66", counter_bg: "#001100", counter_text: "#99FF99",
      table_border: "#66FF66", table_header_bg: "#002200", glow_color: "#66FF66",
      nav_active_bg: "#FFDD00", nav_active_text: "#002200", name: "Forest",
    },
    "windows" => {
      bg: "#008080", bg_pattern: "none", bg_size: "auto",
      text_color: "#000000", heading_color: "#000080",
      link_color: "#000080", link_hover: "#FF0000", accent_color: "#000080",
      border_light: "#FFFFFF", border_dark: "#808080", panel_bg: "#C0C0C0",
      panel_border: "#808080", counter_bg: "#000080", counter_text: "#FFFFFF",
      table_border: "#808080", table_header_bg: "#000080", glow_color: "#000080",
      nav_active_bg: "#000080", nav_active_text: "#FFFFFF", name: "Windows 95",
    },
  }.freeze

  def self.get_theme(name)
    THEMES[name] || THEMES["neon"]
  end
end
