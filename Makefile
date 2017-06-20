.DEFAULT_GOAL := build

JS_FILES = $(shell find $(pwd)/src -name "*.js" -o -name "*.jsx")
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