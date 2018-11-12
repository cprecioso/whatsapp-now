next := npx next
serve := npx serve
watch := npx watch
now := npx now

.PHONY: all
all: export

.PHONY: clean
clean:
	rm -rf node_modules out .next

.PHONY: bootstrap
bootstrap: node_modules

node_modules: shrinkwrap.yaml package.json
	pnpm install

.PHONY: dev
dev: node_modules
	$(next) dev

.PHONY: build
build: .next/BUILD_ID
.next/BUILD_ID: node_modules next.config.js .babelrc pages/* src/*
	$(next) build

.PHONY: start
start: .next/BUILD_ID
	$(next) start

.PHONY: export
export: out
out: .next/BUILD_ID
	$(next) export

.PHONY: serve
serve: out
	$(serve) out

.PHONY: deploy
deploy: out
	$(now) deploy out --local-config=../now.json
