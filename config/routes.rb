Rails.application.routes.draw do
  scope module: :web do
    resource :board, only: :show
    resource :session, only: :new
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
