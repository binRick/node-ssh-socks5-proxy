#!/usr/bin/env node

var tunnel = require('reverse-tunnel-ssh'),
    l = console.log;

tunnel({
    host: 'xxxxxxxxx',
    password: 'xxxxxxxxx',
    port: 12345,
    username: 'root',
    dstHost: '127.0.0.1',
    dstPort: 2222,
    srcHost: '127.0.0.1',
    srcPort: 22,
}, function(error, clientConnection) {
    if (error) throw error;
	l('Client Connection!');


});
