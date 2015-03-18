set :application, 'timerapp'

set :scm, :git
set :repo_url, 'git@github.com:laalex/timerapp.git'


set :deploy_to, "/home/deployer/apps/timerapp"
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

set :pty, true
set :format, :pretty

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart do
    on roles(fetch(:passenger_roles)), in: fetch(:passenger_restart_runner), wait: fetch(:passenger_restart_wait), limit: fetch(:passenger_restart_limit) do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  task :reset_database do
    run_remote_rake "db:reset"
  end
end

def run_remote_rake(rake_cmd)
  rake_args = ENV['RAKE_ARGS'].to_s.split(',')
  cmd = "cd #{fetch(:latest_release)} && #{fetch(:rake, "rake")} RAILS_ENV=#{fetch(:rails_env, "production")} #{rake_cmd}"
  cmd += "['#{rake_args.join("','")}']" unless rake_args.empty?
  run cmd
  set :rakefile, nil if exists?(:rakefile)
end


after "deploy", "deploy:migrate"
after "deploy:restart", "deploy:cleanup"