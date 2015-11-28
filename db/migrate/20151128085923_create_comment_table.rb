class CreateCommentTable < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :text, null: false
      t.integer :event_id, null: false
    end
  end
end
