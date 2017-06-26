.DEFAULT_GOAL := build

JS_FILES = $(shell find ./src -name "*.js" -o -name "*.jsx")
PRETTIER_OPTIONS = --single-quote --trailing-comma es5 --print-width 120

setup: clean
	yarn --pure-lockfile

build:
	yarn build

clean:
	rm -rf ./node_modules
	rm -rf ./lib/*

test:
	yarn flow

fmt:
	./node_modules/.bin/prettier $(PRETTIER_OPTIONS) --write $(JS_FILES)

.PHONY: setup build clean test fmt

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
