# IDEI Theme Tutor Plugin

This is a Tutor plugin that enables the custom Asociatia IDEI theme for OpenEDX.

## Installation

```bash
# Install the plugin
pip install -e .

# Enable the plugin
tutor plugins enable idei-theme

# Rebuild and restart
tutor local quickstart
```

## What This Plugin Does

1. **Adds Custom Theme**: Installs the idei-theme as the default OpenEDX theme
2. **Configures Paths**: Sets up the theme directories in OpenEDX
3. **Applies Settings**: Configures OpenEDX to use the custom theme

## Plugin Structure

```
tutorideitheme/
├── __init__.py          # Package init
├── plugin.py            # Main plugin logic
└── templates/           # Tutor templates
    └── idei-theme/
        └── build/
            └── Dockerfile   # Theme build instructions
```

## Configuration

The plugin automatically configures:

```python
OPENEDX_COMPREHENSIVE_THEME_DIRS = ["/openedx/themes"]
OPENEDX_DEFAULT_THEME_NAME = "idei-theme"
```

## Development

To modify the plugin:

1. Edit `plugin.py` to change configuration
2. Reinstall: `pip install -e .`
3. Rebuild: `tutor config save && tutor local quickstart`

## Commands

The plugin adds initialization commands that run when OpenEDX starts:

- Installs the theme in LMS
- Installs the theme in CMS
- Configures theme settings

## Troubleshooting

### Plugin Not Loading

```bash
# Check if plugin is enabled
tutor plugins list

# Enable it
tutor plugins enable idei-theme

# Rebuild
tutor local quickstart
```

### Theme Not Applying

```bash
# Check theme directory
tutor local exec lms ls -la /openedx/themes

# Check OpenEDX settings
tutor local exec lms ./manage.py lms shell
>>> from django.conf import settings
>>> settings.COMPREHENSIVE_THEME_DIRS
>>> settings.DEFAULT_SITE_THEME
```

## More Information

- Main documentation: `../../SETUP-GUIDE.md`
- Theme development: `../../THEME-DEVELOPMENT.md`
- Tutor plugins: https://docs.tutor.overhang.io/plugins/
