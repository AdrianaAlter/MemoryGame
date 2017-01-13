class Api::GamesController < ApplicationController

  def create
    @game = Game.new(game_params)
    if @game.save
      render :show
    end
  end

  def update
    @game = Game.find(params[:id])
    @game.update(game_params)
    render :show
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    render json: {}
  end

  private

  def game_params
    params.require(:game).permit(:level, :user_id, :theme, :saved, :started, :mute, :final_time)
  end

end
