class MustacheController < ApplicationController

  def get_template
    template_name = params[:name]
    render template_name, layout: false
  end

end