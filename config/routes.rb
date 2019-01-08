Rails.application.routes.draw do
  scope module: :web do
    resource :board, only: :show
    resource :session, only: [:new, :create, :destroy]
    resource :developers, only: [:new, :create]
  end

  namespace :admin do
    resources :users
  end

  root :to => "web/board#show"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
