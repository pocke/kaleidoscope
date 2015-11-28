class Companies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name, null: false
    end

    create_table :events do |t|
      t.string :name, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :company_id, null: false
      t.string  :prize, null: false
      t.text  :description, null: false
      t.integer  :limit_user, null: false
    end
  end
end
