class Companies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
    end

    create_table :events do |t|
      t.string :name
      t.date :start_date
      t.date :end_date
      t.integer :company_id
    end
  end
end
