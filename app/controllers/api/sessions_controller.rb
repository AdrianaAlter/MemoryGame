class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_user_name(params[:user_name], params[:password])
    if @user
      log_in(@user)
      render json: @user
    end
  end

  def show
   if logged_in?
     render json: current_user
   else
     render json: { message: "Must log in to access show page" }, status: 401
   end
  end


  def destroy
    log_out
    render json: {}
  end
end
