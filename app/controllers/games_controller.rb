class GamesController < ApplicationController
  	skip_before_action :verify_authenticity_token, only: [:create]

	# GET /games
	def index
		@games = Game.where({user_id: current_user.id}).all
	end

	# POST /games
	# POST /games.json
	def create
		@game = Game.new(game_params)
		@game[:user_id] = current_user.id
		respond_to do |format|
	      if @game.save
	        format.html { redirect_to @game, notice: 'User was successfully created.' }
	        format.json { render json: @game.to_json, status: :created}
	      else
	        format.html { render :new }
	        format.json { render json: @game.errors, status: :unprocessable_entity }
	      end
	    end
	end

	private
		def game_params
			params.require(:game).permit(:difficulty, :pgn, :result, :date)
		end
end
