require 'test_helper'

class Web::BoardControllerTest < ActionDispatch::IntegrationTest
  setup do
    admin = create(:admin)
    sign_in_as admin
  end

  test "should get show" do
    get board_url
    assert_response :success
  end

end
