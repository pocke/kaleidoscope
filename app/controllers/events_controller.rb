class EventsController < ApplicationController
  def show
    id = params.require(:id)
    @event = Event.find(id)
  end

  def register
    id = params.require(:id)
    u = current_user
    e = Event.find(id)
    uids = e.user_ids
    uids.push(u.id)
    e.user_ids = uids
    e.save!
    redirect_to event_path(id)
  end
end
