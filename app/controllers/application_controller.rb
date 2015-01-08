class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  wrap_parameters false
end
