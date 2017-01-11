User.destroy_all
Game.destroy_all
Card.destroy_all
user = User.create(user_name: 'Sennacy the Great', password: 'sennacy')
guest = User.create(user_name: 'guest', password: 'guest')
