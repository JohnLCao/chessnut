class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :difficulty
      t.string :pgn
      t.string :result
      t.date :date

      t.timestamps null: false
    end
  end
end
