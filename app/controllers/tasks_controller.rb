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
    @Task = Task.create(task_params)
    if(@Task.errors.empty?)
      redirect_to root_path
    else
      flash.now[:error] = "There were errors creating your task. Please try again"
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
