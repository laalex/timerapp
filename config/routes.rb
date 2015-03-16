Rails.application.routes.draw do

  root "tasks#show"

  namespace :tasks do
    resources :tasks
  end
end
