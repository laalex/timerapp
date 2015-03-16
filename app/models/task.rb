class Task < ActiveRecord::Base
  # Validations performed on the task
  validates :name, presence: true
  validates :duration, presence: true, numericality: {only_integer: true}
  validates :description, presence: true


  def is_finished?
    begin
      self.duration > 0
    rescue => e
      false
    end
  end

end
