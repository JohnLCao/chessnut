class Game < ActiveRecord::Base
	belongs_to :user
	validates_uniqueness_of :date
end
