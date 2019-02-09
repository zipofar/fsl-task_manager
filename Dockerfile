FROM ruby:2.5

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install curl gnupg -yq \
    && apt-get install nodejs -yq \
    && npm install -g yarn

RUN mkdir -p /task_manager
WORKDIR /task_manager
COPY Gemfile Gemfile.lock package.json yarn.lock ./

CMD bundle exec rails s -b '0.0.0.0' -p 3000
