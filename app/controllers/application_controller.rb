class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # You may choose to turn off Params Wrapper altogether
  # wrap_parameters false
end
