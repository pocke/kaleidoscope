# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

c = Company.find_or_create_by!(name: "SLOGAN")
e = Event.find_or_create_by!(
  name: "Hacker Wars II", 
  start_date: Time.local(2015, 11, 28, 10), 
  end_date: Time.local(2015, 11, 29, 16),
  company: c,
  prize: "10万円",
  description: "日本一の学生エンジニアを決定するハッカソン･イベント",
  limit_user: 50,
)
Comment.create!(
  text: "Hi!",
  event: e,
)
