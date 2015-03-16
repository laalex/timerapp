class TasksController < ApplicationController

  # Show tasks
  def show
    @Tasks = Task.all

  end

  # Create a new task
  def new

  end

  # Create a new task - post
  def create
    binding.pry
    @Task = Task.create(task_params)
    if(@Task)
      binding.pry
    else
      render "new"
    end
  end

  # Edit a task
  def edit

  end

  # Edit a task - post request
  def update

  end

  # Delete a task
  def destroy

  end


  private

    def task_params
      params[:task].permit(:name, :duration, :description)
    end
end
