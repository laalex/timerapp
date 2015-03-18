module TasksHelper
  # Shows a formatted duration in d:H:M:S by default or by specified format
  def show_formatted_duration(seconds)
    seconds ||= 0
    # Do calculations
    hours = seconds / 3600
    seconds -= hours * 3600
    minutes = seconds / 60
    seconds -= minutes * 60
    # Format the numbers with 0 where needed
    hours = sprintf '%02d', hours
    minutes = sprintf '%02d', minutes
    seconds = sprintf '%02d', seconds
    # Return HH, MM, SS
    "#{hours}:#{minutes}:#{seconds}"
  end
end
