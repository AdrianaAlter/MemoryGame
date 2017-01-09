class Game < ActiveRecord::Base
  has_many :cards, dependent: :destroy, autosave: :true
  belongs_to :user
end
