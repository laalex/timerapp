Rails.application.routes.draw do
  # Application root
  root "tasks#show"

  # Tasks routes
  resources :tasks

  # Get mustache template
  get '/mustache/template/:name', to: "mustache#get_template"
end
