FactoryBot.define do
  factory :task do
    name { generate :string }
    description { generate :string }
    author_id { "" }
    assignee_id { "" }
  end
end
