install:
	npm ci

test:
	npx jest

lint:
	npx eslint .

publish:
	npm publish --dry-run
		

.PHONY: test