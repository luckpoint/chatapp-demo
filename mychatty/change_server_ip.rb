#!/usr/bin/env ruby

require 'socket'

def my_first_private_ipv4
  Socket.ip_address_list.detect{|intf| intf.ipv4_private?}
end

$ip = my_first_private_ipv4.ip_address

def sed path, &block
  content = File.read(path)
  yield content
  open(path, "w") { |io| io.write(content) }
end

change_sever_ip = proc { |content|
  content.sub!(/  var SERVER_IP = '.*';/, "  var SERVER_IP = '#{$ip}';")
}

change_sever_port = proc { |content|
  content.sub!(/  var SERVER_PORT = .*;/, "  var SERVER_PORT = 80;")
}

sed("client/main.js", &change_sever_ip) 
sed("client/main.js", &change_sever_port) 
