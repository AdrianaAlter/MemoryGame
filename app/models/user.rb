class User < ActiveRecord::Base

  after_initialize :ensure_session_token
  attr_accessor :password

  validates :user_name, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true

  has_many :games
  has_many :cards, through: :games

  def self.find_by_user_name(user_name, password)
    user = User.find_by(user_name: user_name)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
