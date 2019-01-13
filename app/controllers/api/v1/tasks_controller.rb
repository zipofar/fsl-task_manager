class Api::V1::TasksController < Api::V1::ApplicationController
  respond_to :json

  def show
    task = Task.find(params[:id])
    respond_with task
  end

  def index
    q_params = params[:q] || { s: 'id asc' }

    tasks = Task.all
      .ransack(q_params)
      .result
      .page(params[:page])
      .per(params[:per_page])

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
    updateState task, params[:task][:state]
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

  def updateState(task, state)
    case state
    when 'in_development'
      task.send :to_dev
    when 'archived'
      task.send :to_archived
    when 'in_qa'
      task.send :to_qa
    when 'in_code_review'
      task.send :to_code_review
    when 'ready_for_release'
      task.send :to_ready_for_release
    when 'released'
      task.send :to_release
    end
  end
end
