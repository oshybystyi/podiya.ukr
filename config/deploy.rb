# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'events-app'
# set :repo_url, 'git@example.com:me/my_repo.git'
set :repo_url, 'git@bitbucket.org:oshybystyi/events-app.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/var/nodewww/events-app'

set :bundler_roles, %w(web app db)

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules', 'bower_components')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  before 'deploy:symlink:release', :npm_and_grunt do
    on release_roles(:all) do

      within "#{deploy_to}/releases" do

        # get newly created folder
        last_dir_str = capture :ls, '-lt'
        last_dir = last_dir_str.split("\n")[1].split(' ').last

        within last_dir do
          execute :npm, 'install'
          execute :bower, 'install'
          execute :grunt, 'prod'
        end

      end
    end
  end

  after :finished, :restart_server do
    on roles(:superuser) do
      # copy service
      src_path = "/var/nodewww/events-app/current/server-configs/etc/init/eventsapp.conf"
      dst_path = "/etc/init/"
      execute :cp, src_path, dst_path

      # restart forever
      begin
        execute :stop, 'eventsapp'
      rescue
        p "Stopping eventsapp didn't work but don't care"
      end

      execute :start, 'eventsapp'
    end
  end

end
