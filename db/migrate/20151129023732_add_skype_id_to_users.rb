class AddSkypeIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :skype_id, :string
  end
end
