class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_name: params[:user_name], password: params[:password], high_score: '0')
    if @user.save
      log_in(@user)
    end
    render json: @user
  end

  # def update
  #   @user = User.find(params[:id])
  #   render :show
  # end

end
