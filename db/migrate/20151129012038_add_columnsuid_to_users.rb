class AddColumnsuidToUsers < ActiveRecord::Migration
  def change
   change_column :users, :uid, :integer, limit: 8
    #add_column :users, :provider, :string
  end
end
