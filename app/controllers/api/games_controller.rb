class Api::GamesController < ApplicationController

  def index
    @games = current_user.games
    render :index
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      render :show
    end
  end

  def show
    @game = Game.find(params[:id])
    render :show
  end

  def update
    @game = Game.find(params[:id])
    @game.update(game_params)
    render :show
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    @games = Game.all
    render :index
  end

  private

  def game_params
    params.require(:game).permit(:level, :user_id, :theme, :saved, :started, :final_time)
  end

end
