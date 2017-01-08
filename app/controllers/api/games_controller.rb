class Api::GamesController < ApplicationController

  def index
    @games = current_user.games
    render :index
  end

  def create
    @game = Game.new(level: params[:level], user_id: params[:user_id])
    if @game.save
      render :show
    end
  end

  def update
    @game = Game.find(params[:id])
    # @game.update({cards: params[:game][:cards]})
    render :show
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    @games = current_user.games
    render :index
  end

  private

  def game_params
    params.require(:game).permit(:level, :user_id, :cards)
  end

end
