class RootController < ApplicationController
  def index
    @events = Event.all
  end
end
