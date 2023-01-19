install:
	npm ci

test:
	npx jest

coverage:
	npx jest --coverage	

lint:
	npx eslint .

publish:
	npm publish --dry-run

