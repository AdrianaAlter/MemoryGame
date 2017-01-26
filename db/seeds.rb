User.destroy_all
Game.destroy_all
Card.destroy_all
guest = User.create(user_name: 'guest', password: 'guest')
