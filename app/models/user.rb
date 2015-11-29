class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  def self.find_for_oauth(auth)
    user = User.where(uid: auth.uid, provider: auth.provider).first

    unless user
      user = User.create(
        uid:      auth.uid,
        provider: auth.provider,
        email:    User.dummy_email(auth),
        password: Devise.friendly_token[0, 20]
        )
    end

    user
  end

  private

  def self.dummy_email(auth)
    "#{auth.uid}-#{auth.provider}@example.com"
  end


devise :database_authenticatable, :registerable,
:recoverable, :rememberable, :trackable, :validatable, :omniauthable

has_many :users_events
has_many :events, through: :users_events

serialize :skill_list


  SkillList = %w[Rails CakePHP Play Android iOS Node.js jQuery React Angular.js Vue.js]

  
end
