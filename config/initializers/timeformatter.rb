class ActiveSupport::TimeWithZone
  def as_json(options = {})
    strftime('%m/%d %H:%M')
  end
end
