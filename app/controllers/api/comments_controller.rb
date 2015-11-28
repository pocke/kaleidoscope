class Api::CommentsController < ApplicationController
  def index
    e = Event.find(params.require(:event_id))
    render json: e.comments
  end

  def create
    c = Comment.create!(event_id: params.require(:event_id), text: params.require(:text))
    render json: c
  end
end
