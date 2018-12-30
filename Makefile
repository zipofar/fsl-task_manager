gem-install:
	docker-compose run --rm web bash -c "bundle install"
runi:
	docker-compose run --rm --service-ports web /bin/bash
