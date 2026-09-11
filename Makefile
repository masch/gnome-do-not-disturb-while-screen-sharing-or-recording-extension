UUID := do-not-disturb-while-screen-sharing-or-recording@marcinjahn.com
EXT_DIR := $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

.PHONY: all install build link enable disable prefs logs-ext logs-prefs clean

all: build

## Install dependencies
install:
	npm install

## Build extension and compile schemas
build:
	npm run build

## Link dist folder into GNOME Shell extensions directory
link: build
	@mkdir -p "$(HOME)/.local/share/gnome-shell/extensions"
	@if [ -d "$(EXT_DIR)" ] && [ ! -L "$(EXT_DIR)" ]; then \
		echo "Backing up existing directory $(EXT_DIR)..."; \
		mv "$(EXT_DIR)" "$(EXT_DIR).bak"; \
	fi
	@rm -f "$(EXT_DIR)"
	ln -s "$(PWD)/dist" "$(EXT_DIR)"
	@echo "Linked $(PWD)/dist to $(EXT_DIR)"

## Enable the extension
enable:
	gnome-extensions enable $(UUID)

## Disable the extension
disable:
	gnome-extensions disable $(UUID)

## Open preferences window
prefs:
	gnome-extensions prefs $(UUID)

## View extension runtime logs
logs-ext:
	npm run log:extension

## View preferences window logs
logs-prefs:
	npm run log:prefs

## Clean build artifacts
clean:
	npm run clean
