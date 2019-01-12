class Api::ApplicationController < ApplicationController
  include Concerns::AuthHelper

  def build_meta_tasks(collection)
    {
      count: collection.count
    }
  end
end
