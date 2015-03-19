class TasksController < ApplicationController

  before_filter :get_tasks_total_duration

  # Show tasks
  def show
    @Tasks = Task.all
  end

  # Create a new task
  def new

  end

  # Create a new task - post
  def create
    # Create the params for the task
    params_for_task = {
      name: task_params[:name],
      description: task_params[:description],
      duration: create_duration(task_params[:hh], task_params[:mm], task_params[:ss])
    }
    @Task = Task.create(params_for_task)
    if(@Task.errors.empty?)
      render json: {status: "success", task: @Task, formatted_duration: get_formatted_duration(@Task.duration)}.to_json
    else
      render json: {status: "failed", errors: @Task.errors}.to_json
    end
  end

  # Edit a task
  def edit
    @Task = Task.find(params[:id])
    @Duration = get_editable_duration(@Task.duration)
  end

  # Edit a task - post request
  def update
    params_for_task = {
        name: task_params[:name],
        description: task_params[:description],
        duration: create_duration(task_params[:hh], task_params[:mm], task_params[:ss])
    }
    if(Task.find(params[:id]).update_attributes(params_for_task))
      # Task saved
      flash[:success] = "The task has been updated successfully"
      redirect_to root_path
    else
      flash.now[:danger] = "Cannot update the task. Please try again"
      render "edit"
    end
  end

  # Delete a task
  def destroy
    if(Task.find(params[:id]).destroy)
      render json: {status: "success"}.to_json
    else
      render json: {status: "failed", error: "Failed to delete the item. Please try again"}.to_json
    end
  end


  private
    # Return only the required params
    def task_params
      params.permit(:name, :description, :hh, :mm, :ss)
    end

    # Create seconds integer from HTML task duration
    def create_duration(hh, mm, ss)
      hh ||= 0
      mm ||= 0
      ss ||= 0
      # Return the total number of seconds
      hh.to_i.hours.seconds.to_i + mm.to_i.minutes.seconds.to_i + ss.to_i.seconds.to_i
    end

    # Return HTML editable duration from seconds
    def get_editable_duration(seconds)
      hours = seconds / 3600
      seconds -= hours * 3600
      minutes = seconds / 60
      seconds -= minutes * 60
      # Return HH, MM, SS
      {hh: hours, mm: minutes, ss: seconds}
    end

    # Return the total duration of all tasks
    def get_tasks_total_duration
      @TotalDuration = Task.sum(:duration)
    end

    def get_formatted_duration(seconds)
      seconds ||= 0
      # Do calculations
      hours = seconds / 3600
      seconds -= hours * 3600
      minutes = seconds / 60
      seconds -= minutes * 60
      # Format the numbers with 0 where needed
      hours = sprintf '%02d', hours
      minutes = sprintf '%02d', minutes
      seconds = sprintf '%02d', seconds
      # Return HH, MM, SS
      "#{hours} hr #{minutes} min #{seconds} sec"
    end
end
