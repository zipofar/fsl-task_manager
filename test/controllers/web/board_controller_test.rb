require 'test_helper'

class Web::BoardControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get web_board_show_url
    assert_response :success
  end

end
