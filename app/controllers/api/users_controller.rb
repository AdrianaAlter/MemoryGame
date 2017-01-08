class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end
  def create
    @user = User.new(user_name: params[:user_name], password: params[:password], high_score: '0')
    if @user.save
      log_in(@user)
    end
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:high_score, :games)
  end

end
