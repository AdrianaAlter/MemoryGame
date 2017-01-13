User.destroy_all
Game.destroy_all
Card.destroy_all
user = User.create(user_name: 'Sample User', password: 'sample')
guest = User.create(user_name: 'guest', password: 'guest')
