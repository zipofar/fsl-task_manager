FactoryBot.define do
  factory :user do
    first_name { "David" }
    last_name { "Ivanov" }
    password { generate :string }
    email { "#{ generate :string }@mail.ru" }
    avatar { "Avatar" }
    type { "" }
  end
end
