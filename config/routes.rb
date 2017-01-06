Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resource :session
    resources :users
    resources :games do
      resources :cards
    end
  end
end
