.PHONY: help install build theme plugin tutor-init start stop restart logs clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	@echo "Installing dependencies..."
	npm install
	cd theme && npm install
	cd plugins/idei-theme && pip install -e .

build: theme ## Build everything

theme: ## Build the custom theme
	@echo "Building custom theme..."
	cd theme && npm run build

plugin: ## Install the Tutor plugin
	@echo "Installing Tutor plugin..."
	cd plugins/idei-theme && pip install -e .
	tutor plugins enable idei-theme

tutor-init: ## Initialize Tutor (first time setup)
	@echo "Initializing Tutor..."
	tutor config save
	tutor local quickstart

start: ## Start OpenEDX services
	@echo "Starting OpenEDX..."
	tutor local start -d

stop: ## Stop OpenEDX services
	@echo "Stopping OpenEDX..."
	tutor local stop

restart: ## Restart OpenEDX services
	@echo "Restarting OpenEDX..."
	tutor local restart

logs: ## Show logs
	tutor local logs -f

shell-lms: ## Open a shell in the LMS container
	tutor local exec lms bash

shell-cms: ## Open a shell in the CMS container
	tutor local exec cms bash

watch: ## Watch for theme changes and rebuild
	cd theme && npm run watch

clean: ## Clean build artifacts
	@echo "Cleaning build artifacts..."
	cd theme && npm run clean
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true

dev-setup: install build plugin tutor-init ## Complete development setup
	@echo "Development setup complete!"
	@echo "Run 'make start' to start OpenEDX"

update-theme: ## Update and rebuild theme
	cd theme && npm run build
	tutor local restart lms cms

create-user: ## Create a user with profile (prevents login issues)
	@./create-user-with-profile.sh

create-superuser: ## Create a Django superuser (then creates profile)
	@echo "Creating superuser..."
	@tutor local exec lms ./manage.py lms createsuperuser
	@echo ""
	@echo "⚠️  IMPORTANT: Creating user profile to prevent login errors..."
	@read -p "Enter the username you just created: " username; \
	tutor local exec lms ./manage.py lms shell -c " \
	from django.contrib.auth import get_user_model; \
	from common.djangoapps.student.models import UserProfile; \
	User = get_user_model(); \
	user = User.objects.get(username='$$username'); \
	profile, created = UserProfile.objects.get_or_create(user=user, defaults={'name': user.username}); \
	print('✅ Profile created!' if created else 'Profile already exists') \
	"
	@echo "✅ User is ready to log in!"

fix-user-profiles: ## Fix missing profiles for all users (fixes login errors)
	@echo "Fixing user profiles..."
	@tutor local exec lms ./manage.py lms shell -c " \
	from django.contrib.auth import get_user_model; \
	from common.djangoapps.student.models import UserProfile; \
	User = get_user_model(); \
	for user in User.objects.all(): \
	    profile, created = UserProfile.objects.get_or_create(user=user, defaults={'name': user.username}); \
	    print(f'{'✅ Created' if created else 'Already exists'}: {user.username}') \
	"
	@tutor local restart lms
	@echo "✅ Done! Users can now log in."

import-demo-course: ## Import the demo course
	tutor local importdemocourse

status: ## Show status of OpenEDX services
	tutor local status

