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
end
