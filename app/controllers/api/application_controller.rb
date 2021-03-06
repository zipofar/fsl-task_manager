class Api::ApplicationController < ApplicationController
  include Concerns::AuthHelper

  def build_meta(collection)
    {
      count: collection.count,
      total_count: collection.total_count,
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      per_page: collection.limit_value
    }
  end

  def build_meta_tasks(collection)
    build_meta(collection)
  end

  def build_meta_users(collection)
    build_meta(collection)
  end
end
