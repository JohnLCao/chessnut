class GamesController < ApplicationController
	def index
		@games = Game.where({user_id: current_user.id}).all
	end
end
