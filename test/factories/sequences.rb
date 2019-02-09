FactoryBot.define do
  sequence (:email) { |n| "email#{n}@factory.com" }
  sequence (:string) { |n| "string#{n}" }
end
