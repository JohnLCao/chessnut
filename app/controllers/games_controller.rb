class GamesController < ApplicationController
	def index
		@games = Game.where({}).all
	end
end
