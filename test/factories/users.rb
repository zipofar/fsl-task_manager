FactoryBot.define do
  factory :user do
    first_name { "David" }
    last_name { "Ivanov" }
    password { generate :string }
    email { "test@mail.ru" }
    avatar { "MyString" }
    type { "" }
  end
end
