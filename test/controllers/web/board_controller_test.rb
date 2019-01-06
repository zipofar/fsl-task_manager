require 'test_helper'

class Web::BoardControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get board_url
    assert_response :success
  end

end
