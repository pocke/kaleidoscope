Kaleidoscope
============

An Online Hackathon Platform

This application is created in a hackathon. http://hackerwars.goodfind.jp/


Installation
-------------

### Requirements

- Ruby
- bundler (`gem install bundler`)

```sh
git clone https://github.com/pocke/kaleidoscope
bundle install
bundle exec rake db:migrate
bundle exec rake db:seed
```


Start server
-------

```sh
bundle exec rails server
```

And access http://127.0.0.1:3000
