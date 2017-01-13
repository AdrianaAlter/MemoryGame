class Api::CardsController < ApplicationController

  def create
    @card = Card.new(picture: params[:picture], game_id: params[:gameId])
    if @card.save
      render :show
    end
  end

  def update
    @card = Card.find(params[:id])
    @card.update(card_params)
    render :show
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    @cards = Card.all
    render :index
  end

  private

  def card_params
    params.require(:card).permit(:picture, :game_id, :flipped, :matched)
  end

end
