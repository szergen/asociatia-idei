"""
Tutor plugin for Asociatia IDEI custom OpenEDX theme.
This plugin adds a custom theme with shared components from the main website.
"""

import os
from glob import glob
from tutor import hooks

# Plugin configuration
config = {
    "defaults": {
        "VERSION": "1.0.0",
        "THEME_NAME": "idei-theme",
    },
    "overrides": {},
}

# Templates directory
TEMPLATES_DIR = os.path.join(
    os.path.abspath(os.path.dirname(__file__)),
    "templates"
)

# Add the plugin templates to the build
hooks.Filters.ENV_TEMPLATE_ROOTS.add_item(TEMPLATES_DIR)

# Add plugin configuration
hooks.Filters.CONFIG_DEFAULTS.add_items(
    [
        (f"IDEI_THEME_{key}", value)
        for key, value in config.get("defaults", {}).items()
    ]
)

# Override the default theme
hooks.Filters.CONFIG_OVERRIDES.add_items(
    [
        ("OPENEDX_COMPREHENSIVE_THEME_DIRS", ["/openedx/themes"]),
        ("OPENEDX_DEFAULT_THEME_NAME", "idei-theme"),
    ]
)

# Add custom initialization commands
hooks.Filters.COMMANDS_INIT.add_item((
    "lms",
    ("idei-theme", "echo 'Installing Asociatia IDEI custom theme...'"),
))

hooks.Filters.COMMANDS_INIT.add_item((
    "cms",
    ("idei-theme", "echo 'Installing Asociatia IDEI custom theme...'"),
))

