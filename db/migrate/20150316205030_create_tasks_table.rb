class CreateTasksTable < ActiveRecord::Migration
  def change
    create_table :tasks_tables do |t|
      t.string :name
      t.integer :duration
      t.text :description
    end
  end
end
