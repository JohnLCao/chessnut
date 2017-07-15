class SessionsController < ApplicationController
	skip_before_action :ensure_login, only: [:new, :create]
	skip_before_action :verify_authenticity_token, only: [:create]

  def new
  	# should be handled by client side code
  end

  def create
 		user = User.find_by(username: params[:user][:username])
 		password = params[:user][:password]
 		if user && user.authenticate(password)
 			session[:user_id] = user.id
 			render status: 200
 		else
 			render status: 401
 		end 
  end

  def destroy
  end
end
