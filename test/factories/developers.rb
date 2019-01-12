FactoryBot.define do
  factory :developer do
    first_name { generate :string }
    last_name { generate :string }
    password { generate :string }
    email { "#{generate :string}@mail.gen" }
    type { "Developer" }
  end
end
