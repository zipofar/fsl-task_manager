FROM ruby:2.5

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install curl gnupg -yq \
    && apt-get install nodejs -yq \
    && npm install -g yarn

RUN mkdir -p /task_manager
WORKDIR /task_manager
COPY . /task_manager
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 3
RUN yarn install
RUN RAILS_ENV=production SECRET_KEY_BASE=pro bundle exec rails assets:precompile

