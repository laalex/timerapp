class CreateTaskTable < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :duration
      t.text :description
    end
  end
end
