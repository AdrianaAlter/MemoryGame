class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :picture, null: false
      t.boolean :flipped, default: false
      t.boolean :matched, default: false
      t.integer :game_id, null: false
    end
  end
end
