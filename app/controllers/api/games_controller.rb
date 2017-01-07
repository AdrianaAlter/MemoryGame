class Api::GamesController < ApplicationController

  def index
    @games = current_user.games
    debugger
    render :index
  end

  def create
    @game = Game.new(level: params[:level], user_id: params[:user_id])
    if @game.save
      render :show
    end
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
  end

  private

  def game_params
    params.require(:game).permit(:level, :user_id)
  end

end
