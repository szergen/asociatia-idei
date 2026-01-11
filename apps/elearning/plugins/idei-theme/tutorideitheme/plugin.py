"""
Tutor plugin for Asociatia IDEI custom OpenEDX theme.
This plugin adds a custom theme with shared components from the main website.
"""

import os
from tutor import hooks

# Plugin configuration
config = {
    "defaults": {
        "VERSION": "1.0.0",
        "THEME_NAME": "idei-theme",
    },
    "overrides": {},
}

# Add plugin configuration
hooks.Filters.CONFIG_DEFAULTS.add_items(
    [
        (f"IDEI_THEME_{key}", value)
        for key, value in config.get("defaults", {}).items()
    ]
)

# Override the default theme settings
hooks.Filters.CONFIG_OVERRIDES.add_items(
    [
        ("OPENEDX_COMPREHENSIVE_THEME_DIRS", ["/openedx/themes"]),
        ("OPENEDX_DEFAULT_SITE_THEME", "idei-theme"),
    ]
)

# Print a message when the plugin is loaded
@hooks.Actions.PLUGIN_LOADED.add()
def _print_plugin_loaded(plugin_name):
    if plugin_name == "idei-theme":
        print("✅ Asociatia IDEI theme plugin loaded successfully!")

