class Api::V1::TasksController < Api::V1::ApplicationController
  respond_to :json

  def show
    task = Task.find(params[:id])
    respond_with task
  end

  def index
    tasks = Task.all
    json = {
      items: tasks.map { |t| TaskSerializer.new(t).as_json },
      meta: build_meta_tasks(tasks)
    }
    respond_with json
  end

  def create
    task = current_user.my_tasks.new task_params
    if task.save
      respond_with task, location: nil
    else
      render(json: { errors: task.errors }, status: :unprocessible_entity)
    end

  end

  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render(json: task)
    else
      render(json: { errors: task.errors }, status: :unprocessible_entity)
    end
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
      head(:ok)
    else
      render(json: { errors: task.errors }, status: :unprocessible_entity)
    end
  end

  def task_params
    params.require(:task).permit(:name, :description, :assignee_id)
  end
end
