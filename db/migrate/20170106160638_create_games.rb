class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :user_id
      t.integer :level
      t.string :theme
      t.boolean :started, default: false
      t.boolean :mute, default: false
      t.integer :final_time
    end
  end
end
