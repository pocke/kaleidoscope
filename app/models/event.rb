
class Event < ActiveRecord::Base
  belongs_to :company

  has_many :users_events
  has_many :users, through: :users_events

  has_many :comments

  def clustering
    hash = {}
    self.users.each do |u|
     h = {}

     User::SkillList.each do |s|
       h[s] = u.skill_list.include?(s) ? 1 : 0
     end

     hash[u.id] = h
    end


    kmeans = Kmeans::Cluster.new(hash, {
      centroids:  self.users.size / 4,
      loop_max:  100,
    })

    # Kmeans Clustering
    kmeans.make_cluster

    kmeans.cluster.values
  end

  def in_session?
    return start_date < Time.zone.now && Time.zone.now < end_date
  end

  def after_session?
    return end_date < Time.now
  end
end
