class Event < ActiveRecord::Base
  belongs_to :company

  has_many :users_events
  has_many :users, through: :users_events
end
