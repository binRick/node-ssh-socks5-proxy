#!/usr/bin/env node

var l = console.log,
    socks = require('socksv5'),
    c = require('chalk'),
    Client = require('ssh2').Client;

var ssh_config = {
    host: 'xxxxxxxxxxxxxx',
    port: 22,
    username: 'xxxxx',
    password: 'xxxxxxxxxx'
};

var chost = 'xxxxxxxxxxxxxx';

socks.createServer(function(info, accept, deny) {
    var conn = new Client();
    var conn2 = new Client();
    conn.on('ready', function() {
        //        console.log('FIRST :: connection ready');

        l(c.green('Socks connection to') + ' ' + c.yellow(info.dstAddr));

        if (true) {
            conn.exec('nc ' + chost + ' 22', function(err, stream) {
                if (err) {
                    console.log('FIRST :: exec error: ');
                    return conn.end();
                }
                conn2.connect({
                    sock: stream,
                    username: 'xxxxxxxxxx',
                    password: 'xxxxxxxxxxxx',
                });
            });
        }


        if (false) {

            conn.forwardOut(info.srcAddr,
                info.srcPort,
                info.dstAddr,
                info.dstPort,
                function(err, stream) {
                    if (err) {
                        conn.end();
                        return deny();
                    }

                    var clientSocket;
                    if (clientSocket = accept(true)) {
                        stream.pipe(clientSocket).pipe(stream).on('close', function() {
                            conn.end();
                        });
                    } else
                        conn.end();
                });
        }


    }).on('error', function(err) {
        deny();
    }).connect(ssh_config);


    if (true) {
        conn2.on('ready', function() {
            //           console.log('SECOND :: connection ready');


            if (false) {
                conn2.exec('uptime', function(err, stream2) {
                    if (err) {
                        console.log('SECOND :: exec error: ');
                        return conn.end();
                    }
                });
            }
            conn2.forwardOut(info.srcAddr,
                info.srcPort,
                info.dstAddr,
                info.dstPort,
                function(err, stream2) {
                    if (err) {
                        conn2.end();
                        return deny();
                    }

                    var clientSocket;
                    if (clientSocket = accept(true)) {
                        stream2.pipe(clientSocket).pipe(stream2).on('close', function() {
                            conn2.end();
                        });
                    } else
                        conn2.end();


                    stream2.on('end', function() {
                        conn2.end(); // close parent (and this) connection
                    }).on('data', function(data) {
                        //console.log(data.toString());
                    });
                });

        });
    }
}).listen(1080, 'localhost', function() {
    console.log('SOCKSv5 proxy server started on port 1080');
}).useAuth(socks.auth.None());
