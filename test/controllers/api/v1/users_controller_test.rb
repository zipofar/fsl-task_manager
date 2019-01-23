require 'test_helper'

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    user = create :user
    get api_v1_user_path user.id, params: { format: :json }
    assert_response :success
  end

  test "should get index" do
    user = create :user
    get api_v1_users_url, params: { format: :json }
    assert_response :success 
  end
end
