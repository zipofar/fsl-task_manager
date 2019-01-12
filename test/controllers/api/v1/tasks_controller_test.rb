require 'test_helper'

class Api::V1::TasksControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    author = create :user
    task = create :task, author: author
    get api_v1_task_path task.id, params: { format: :json }
    assert_response :success
  end

  test "should get index" do
    author = create :manager
    task1 = create :task, author: author
    task2 = create :task, author: author
    get api_v1_tasks_url, params: { format: :json }
    assert_response :success 
  end

  test "should post create" do
    author = create :manager
    sign_in_as author
    assignee = create :developer
    task_attrs = attributes_for(:task).merge({ assignee_id: assignee.id }).except(:author_id)
    post api_v1_tasks_url, params: { task: task_attrs, format: :json }
    assert_response :created

    data = JSON.parse(response.body)
    created_task = Task.find(data['id'])
    assert created_task.present?
    assert_equal task_attrs.stringify_keys, created_task.slice(*task_attrs.keys)
  end

  test "should put update" do
    author = create :manager
    assignee = create :developer
    task = create :task, author: author
    task_attr = attributes_for(:task)
      .merge({ description: 'new description', assignee_id: assignee.id })
      .except(:author_id)

    patch api_v1_task_url task.id, params: { task: task_attr, format: :json }
    assert_response :success

    task.reload
    assert_equal task_attr.stringify_keys, task.slice(*task_attr.keys)
  end

  test "should delete destroy" do
    author = create :manager
    task = create :task, author: author

    delete api_v1_task_url task.id, params: { format: :json }
    assert_response :success

    assert !Task.where(id: task.id).exists?
  end
end
