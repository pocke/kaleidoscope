class AddOmniToUser < ActiveRecord::Migration
  def change
    add_column :users, :uid, :integer
  end
end
