class AddSkillListToUsers < ActiveRecord::Migration
  def change
    add_column :users, :skill_list, :string
  end
end
