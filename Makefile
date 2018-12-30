gem-install:
	docker-compose run --rm web bash -c "bundle install"
setup-db:
	docker-compose run --rm web bash -c "rails db:setup"
build:
	docker-compose build
runi:
	docker-compose run --rm --service-ports web /bin/bash
up:
	docker-compose up
