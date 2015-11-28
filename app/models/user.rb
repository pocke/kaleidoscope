class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :users_events
  has_many :events, through: :users_events

  serialize :skill_list

  # dummy
  def skype_id
  end

  SkillList = %w[Rails CakePHP Play Android iOS Node.js jQuery React Angular.js Vue.js]

  
end
