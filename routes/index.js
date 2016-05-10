module.exports = function Route(app, server) {
	//this gets the socket.io module
	var io = require('socket.io').listen(server)
	app.get('/', function(req, res) {
		res.render('index');
	})

	var counter = 0;
	io.sockets.on("connection", function(socket){
		socket.on("push_button", function(data){
			counter += 1;
			console.log(counter);
			console.log(data);
			io.emit("push_counter", {response: counter});
		})

		socket.on("reset_button", function(data){
			counter = 0;
			io.emit("reset_action", {response: counter});
		})
	})
};

