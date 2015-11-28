class AddColumsToUser < ActiveRecord::Migration
  def change
    add_column :users, :skill, :string
    add_column :users, :nickname, :string
  end
end
