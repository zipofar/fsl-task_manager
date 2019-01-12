Rails.application.routes.draw do
  scope module: :web do
    resource :board, only: :show
    resource :session, only: [:new, :create, :destroy]
    resource :developers, only: [:new, :create]
  end

  namespace :admin do
    resources :users
  end

  namespace :api do
    namespace :v1 do
      resources :tasks, only: [:index, :show, :create, :update, :destroy]
    end
  end

  root :to => "web/board#show"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
