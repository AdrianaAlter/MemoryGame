class Card < ActiveRecord::Base
  validates :picture, presence: true
  validates :game_id, presence: true, allow_nil: true
  belongs_to :game
  has_one :user, through: :game
end
