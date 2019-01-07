require 'test_helper'

class Web::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get new_session_url
    assert_response :success
  end

  test "should post create" do
    password = generate(:string)
    user = create(:user, { password: password })
    attr = { email: user.email, password: password }
    post session_url, params: { session: attr }
    assert_response :redirect
  end

  test "should delete destroy" do
    delete session_url
    assert_response :redirect
  end
end
