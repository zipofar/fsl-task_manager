gem-install:
	docker-compose run --rm web bash -c "bundle install"
setup-db:
	docker-compose run --rm web bash -c "rails db:setup"
setup-simple_form:
	docker-compose run --rm web bash -c "rails generate simple_form:install --bootstrap"
test:
	docker-compose run --rm web bash -c "rails test"
build:
	docker-compose build
runi:
	docker-compose run --rm --service-ports web /bin/bash
up:
	docker-compose up

.PHONY: test
