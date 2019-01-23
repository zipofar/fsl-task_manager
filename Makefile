gem-install:
	docker-compose run --rm web bash -c "bundle install"
setup-db:
	docker-compose run --rm web bash -c "rails db:setup"
db-create:
	docker-compose run --rm web bash -c "rails db:create db:migrate"
test:
	docker-compose run --rm web bash -c "rails test"
build:
	docker-compose build
yarn:
	docker-compose run --rm web /bin/sh -c "yarn install"
webpack-compile:
	docker-compose run --rm web /bin/sh -c "RAILS_ENV=test bundle exec rails webpacker:compile"

compose: build db-create yarn webpack-compile
up:
	docker-compose up
runi:
	docker-compose run --rm --service-ports web /bin/bash
run-dev:
	docker-compose run --rm --service-ports web /bin/bash -c "rails s"


.PHONY: test
