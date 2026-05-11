<?php

declare(strict_types=1);

namespace GeocitiesApp;

class Generator
{
    private static array $allPages = [
        ['key' => 'index',     'label' => '🏠 Home',      'file' => 'index.html'],
        ['key' => 'about',     'label' => '👤 About Me',   'file' => 'about.html'],
        ['key' => 'gallery',   'label' => '🖼️ Gallery',    'file' => 'gallery.html'],
        ['key' => 'guestbook', 'label' => '📖 Guestbook',  'file' => 'guestbook.html'],
        ['key' => 'links',     'label' => '🔗 Cool Links', 'file' => 'links.html'],
    ];

    private static string $templateDir = __DIR__ . '/../templates';

    public static function generate(string $outputDir, array $answers): array
    {
        $theme = Themes::get($answers['theme']);
        $pages = $answers['pages'] ?? [];

        @mkdir($outputDir . '/css', 0755, true);
        @mkdir($outputDir . '/js',  0755, true);

        $baseVars = [
            'SITE_NAME'       => $answers['site_name'],
            'AUTHOR_NAME'     => $answers['author_name'],
            'THEME_NAME'      => $theme['name'],
            'BG'              => $theme['bg'],
            'BG_PATTERN'      => $theme['bgPattern'],
            'BG_SIZE'         => $theme['bgSize'],
            'TEXT_COLOR'      => $theme['textColor'],
            'HEADING_COLOR'   => $theme['headingColor'],
            'LINK_COLOR'      => $theme['linkColor'],
            'LINK_HOVER'      => $theme['linkHover'],
            'ACCENT_COLOR'    => $theme['accentColor'],
            'BORDER_LIGHT'    => $theme['borderLight'],
            'BORDER_DARK'     => $theme['borderDark'],
            'PANEL_BG'        => $theme['panelBg'],
            'PANEL_BORDER'    => $theme['panelBorder'],
            'COUNTER_BG'      => $theme['counterBg'],
            'COUNTER_TEXT'    => $theme['counterText'],
            'TABLE_BORDER'    => $theme['tableBorder'],
            'TABLE_HEADER_BG' => $theme['tableHeaderBg'],
            'GLOW_COLOR'      => $theme['glowColor'],
            'NAV_ACTIVE_BG'   => $theme['navActiveBg'],
            'NAV_ACTIVE_TEXT' => $theme['navActiveText'],
            'CURSOR_EFFECT'   => $answers['cursor_effect'] ?? 'none',
            'FALLING_EFFECT'  => $answers['falling_effect'] ?? 'none',
            'WELCOME_ALERT'   => ($answers['welcome_alert'] ?? false) ? 'true' : 'false',
            'PLAY_MUSIC'      => ($answers['play_music'] ?? false) ? 'true' : 'false',
            'FAKE_HIGH_COUNT' => ($answers['fake_high_count'] ?? false) ? 'true' : 'false',
            'YEAR'            => (string) date('Y'),
        ];

        $css = file_get_contents(self::$templateDir . '/css/style.css');
        file_put_contents($outputDir . '/css/style.css', self::interpolate($css, $baseVars));

        $js = file_get_contents(self::$templateDir . '/js/main.js');
        file_put_contents($outputDir . '/js/main.js', self::interpolate($js, $baseVars));

        $pagesToGenerate = [['key' => 'index', 'file' => 'index.html']];
        foreach ($pages as $p) {
            $pagesToGenerate[] = ['key' => $p, 'file' => $p . '.html'];
        }

        $generated = [];
        foreach ($pagesToGenerate as $page) {
            $tmpl = self::$templateDir . '/' . $page['file'];
            if (!file_exists($tmpl)) continue;

            $nav  = self::buildNavLinks($pages, $page['key']);
            $html = self::interpolate(file_get_contents($tmpl), array_merge($baseVars, ['NAV_LINKS' => $nav]));
            file_put_contents($outputDir . '/' . $page['file'], $html);
            $generated[] = $page['file'];
        }

        return $generated;
    }

    private static function interpolate(string $template, array $vars): string
    {
        return preg_replace_callback('/\{\{(\w+)\}\}/', function ($m) use ($vars) {
            return $vars[$m[1]] ?? $m[0];
        }, $template);
    }

    private static function buildNavLinks(array $pages, string $currentPage): string
    {
        $active = array_merge(['index'], $pages);
        $links  = [];
        foreach (self::$allPages as $p) {
            if (!in_array($p['key'], $active, true)) continue;
            $cls = $p['key'] === $currentPage ? 'nav-link nav-active' : 'nav-link';
            $links[] = sprintf('<a href="%s" class="%s">%s</a>', $p['file'], $cls, $p['label']);
        }
        return implode("\n        ", $links);
    }
}
