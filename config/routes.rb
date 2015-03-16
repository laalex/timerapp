Rails.application.routes.draw do
  # Application root
  root "tasks#show"

  # Tasks routes
  resources :tasks
end
