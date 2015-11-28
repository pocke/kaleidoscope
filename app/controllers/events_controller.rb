class EventsController < ApplicationController
  def show
    id = params.require(:id)
    @event = Event.find(id)
  end
end
