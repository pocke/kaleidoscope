class EventsController < ApplicationController
  before_action :authenticate_user!
  def show
    id = params.require(:id)
    @event = Event.find(id)
  end

  def feedback
    id = params.require(:id)
    @event = Event.find(id)
  end

  def now
  end

  def register
    id = params.require(:id)
    u = current_user
    e = Event.find(id)
    uids = e.user_ids
    uids.push(u.id)
    e.user_ids = uids
    e.save!
    flash[:notice] = "#{e.name} に参加が確定しました!"
    redirect_to event_path(id)
  end
end
