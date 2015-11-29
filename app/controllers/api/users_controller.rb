class Api::UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params.require(:id))
  end

  def skill_list
    render json: User::SkillList
  end

  def team_member
    res = [current_user]
    User.all[0..3].each do |u|
      res.push(u)
    end
    render json: res
  end
end
