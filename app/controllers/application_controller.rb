class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :ensure_login

  helper_method :current_user

	def main_page
		redirect_to '/#!'
	end

  protected
  	def ensure_login
  		redirect_to '/#!/login' unless session[:user_id]
  	end

    def current_user
      @current_user = User.find(session[:user_id]);
    end

    def ensure_admin
      redirect_to '/#!/login' unless current_user.username == "admin"
    end
end
