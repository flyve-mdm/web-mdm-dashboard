# Add header to all html files on the folder 'coverage'
Dir.glob("coverage/**/*.html") do |search_file|
    file = File.open("#{search_file}", "r+")
    buffer = file.read
    file.rewind
    file.puts "---"
    file.puts "layout: coverage"
    file.puts "---"
    file.print buffer
    file.close
end
