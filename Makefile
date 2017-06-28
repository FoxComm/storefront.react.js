.DEFAULT_GOAL := build

JS_FILES = $(shell find ./src -name "*.js" -o -name "*.jsx")
PRETTIER_OPTIONS = --single-quote --trailing-comma es5 --print-width 120

.PHONY: setup
setup: clean
	yarn --pure-lockfile

.PHONY: build-theme
build-theme:
	./node_modules/.bin/gulp

.PHONY: build
build:
	make build-theme
	THEME=tpg make build-theme
	make prepare-package

.PHONY: clean
clean:
	rm -rf ./node_modules
	rm -rf ./build

.PHONY: prepare-package
prepare-package:
	cp package.json README.md .npmrc postcss.config.js build/
	cp src/index.js build/exports.js

.PHONY: test
test:
	yarn flow

.PHONY: fmt
fmt:
	./node_modules/.bin/prettier $(PRETTIER_OPTIONS) --write $(JS_FILES)

.PHONY: publish
publish: build
	npm publish ./build --access restricted


.PHONY: build-sg
build-sg:
	NODE_PATH=./src ./node_modules/.bin/styleguidist build --config styleguide.config.js

.PHONY: build-sg-tpg
build-sg-tpg:
	THEME=tpg NODE_PATH=./src ./node_modules/.bin/styleguidist build --config styleguide.config.js

.PHONY: build-styleguides
build-styleguides: build-sg build-sg-tpg

.PHONY: sg
sg:
	NODE_PATH=./src ./node_modules/.bin/styleguidist server --config styleguide.config.js

.PHONY: sg-tpg
sg-tpg:
	THEME=tpg NODE_PATH=./src ./node_modules/.bin/styleguidist server --config styleguide.config.js
