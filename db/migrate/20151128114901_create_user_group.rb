class CreateUserGroup < ActiveRecord::Migration
  def change
    create_table :user_groups do |t|
      t.integer :event_id, null: false
      t.integer :user_id, null: false
      t.string :name, null: false
      t.string :github_url
      t.string :slide_url
    end
  end
end
