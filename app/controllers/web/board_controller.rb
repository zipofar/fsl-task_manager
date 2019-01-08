class Web::BoardController < Web:: ApplicationController
  before_action :authenticate_user!
  def show
  end
end
