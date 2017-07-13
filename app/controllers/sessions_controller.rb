class SessionsController < ApplicationController
	skip_before_action :ensure_login, only: [:new, :create]

  def new
  	# sessions/new.html.erb
  end

  def create
 		user = User.find_by(username: params[:user][:username])
 		if user
 			session[:user_id] = user.id
 			redirect_to root_path
 		else
 			redirect_to login_path
 		end 
  end

  def destroy
  end
end
