# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{deployer@alexandrulamba.com}
role :web, %w{deployer@alexandrulamba.com}
role :db,  %w{deployer@alexandrulamba.com}


# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

server 'alexandrulamba.com', user: 'deployer', roles: %w{web}, primary: true

set :ssh_options, {
    forward_agent: true,
    auth_methods: %w(password),
    password: '<deployer>',
    user: 'deployer',
}