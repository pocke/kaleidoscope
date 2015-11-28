class API::UsersController < ApplicationController
  def index
    render json: User.all.to_json
  end
end
