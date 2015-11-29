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
  start_date: Time.utc(2015, 11, 28, 10), 
  end_date: Time.utc(2015, 11, 29, 16),
  company: c,
  prize: "10万円",
  description: "日本一の学生エンジニアを決定するハッカソン･イベント",
  limit_user: 50,
)

Event.find_or_create_by!(
  name: "Hacker Wars I", 
  start_date: Time.utc(2015, 6, 6, 10), 
  end_date: Time.utc(2015, 6, 7, 16),
  company: c,
  prize: "10万円",
  description: "日本一の学生エンジニアを決定するハッカソン･イベント",
  limit_user: 50,
)

Event.find_or_create_by!(
  name: "Hacking Ruby", 
  start_date: Time.utc(2015, 3, 4, 10), 
  end_date: Time.utc(2015, 3, 7, 16),
  company: Company.find_or_create_by!(name: "Ruby Association"),
  prize: "10万円",
  description: "Hacking Ruby on Rails",
  limit_user: 50,
)

Comment.create!(
  text: "Hi!",
  event: e,
)


# user data
35.times do |i|
  g = Gimei.name
  User.create(
    email: "#{g.first.hiragana.to_roma}@gmail.com",
    password: "hogehoge",
    skill: "engineer",
    nickname: g.kanji,
    skill_list: User::SkillList.select{rand(3) == 2},
    events: [e],
    skype_id: g.last.hiragana.to_roma,
  )
end
