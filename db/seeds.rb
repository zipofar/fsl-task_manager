admin = Admin.find_or_create_by(first_name: 'Sadmin', last_name: 'Sadmin', email: 'admin@root')
admin.password = 'admin'
admin.save

60.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "mail#{i}@gmail.gen"
  u.first_name = "UserFN#{i}"
  u.last_name = "UserLN#{i}"
  u.password = "pass#{i}"
  u.save
end
