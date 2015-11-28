module ApplicationHelper
  def bootstrap_flash(options = {})
    flash_messages = []
    flash.each do |type, message|
      # Skip empty messages, e.g. for devise messages set to nothing in a locale file.
      next if message.blank?

      type = type.to_sym
      type = :success if type.to_s == :notice.to_s
      type = :danger if type.to_s == :alert.to_s

      Array(message).each do |msg|
        text = content_tag(:div,
          content_tag(:button, raw("&times;"), :class => "close", "data-dismiss" => "alert") + msg,
          class: "alert fade in alert-#{type} alert-dismissible #{options[:class]}",
        )
        flash_messages << text if msg
      end
    end
    flash_messages.join("\n").html_safe
  end

  def gravatar(email)
    require 'digest/md5'
    email_address = email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    image_src = "http://www.gravatar.com/avatar/#{hash}"

    return image_tag(image_src, size: "24x24", class: "img-rounded gravatar-icon")
  end
end
