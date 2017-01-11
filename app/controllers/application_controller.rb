class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_game, :current_user, :logged_in?

  def current_game(game)
    @current_game ||= Game.find_by_session_token(session[:session_token])
  end

  def log_in(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def log_out
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def must_log_in!
    redirect_to new_api_session_url unless logged_in
  end

end
