# Add spaces between '{{' and '}}' characters
Dir.glob("#{ARGV[0]}/**/*.html") do |file_name|
    text = File.read(file_name)
    replace = text.gsub!(/{{/, "{ {")
    if replace
        File.open(file_name, "w") { |file| file.puts replace }
    end
    replace = text.gsub!(/}}/, "} }")
    if replace
        File.open(file_name, "w") { |file| file.puts replace }
    end
end
