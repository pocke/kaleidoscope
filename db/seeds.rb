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
)

