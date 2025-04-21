var GameEngine = (function(GameEngine) {
	let cw;
	let ch;
	let rect_x; //posicion x del rectangulo rojo
	let rect_y; //posicion y dle rectangulo rojo
	let rect_x2; //posicion x del rectangulo azul
	let rect_y2; //posicion y del rectangulo azul
	let rect_w; //ancho de los rectangulos
	let rect_h; //largo de los rectangulos
	let scoreP1= 0; //marcador jugador 1
	let scoreP2 = 0; //marcador jugador 2
	let bandera = false;
	let mensaje = "Presiona espacio";
	let mensaje2 = "";
	let mensaje3 = "Para comenzar";
	let audio = new Audio("music1.mp3");
	let audio2 = new Audio("music2.mp3");

	let Key = {
		_pressed : {},

		UP: 38,
		DOWN: 40,
		ARRIBA: 87,
		ABAJO: 83,
		SPACE: 32,

		isPress: function(keyCode) {
			return this._pressed[keyCode];
		},
		onKeyDown: function(keyCode){
			this._pressed[keyCode] = true;
		},
		onKeyUp: function(keyCode){
			delete this._pressed[keyCode];
		}
	}

	class Game{
		constructor(ctx){
			cw = ctx.canvas.width;
			ch = ctx.canvas.height;
			this.ctx = ctx;

			this.ball = new GameEngine.Ball(350, 250, 10);



			//posicion inicial del rectangulo rojo
			rect_x = 20;
			rect_y = ch/2;

			//posicion inicial del rectangulo azul
			rect_x2 = cw-20;
			rect_y2 = ch/2;

			rect_w = 15;
			rect_h = 100;


			window.addEventListener("keydown", function(evt){
				Key.onKeyDown(evt.keyCode);
			});

			window.addEventListener("keyup", function(evt){
				Key.onKeyUp(evt.keyCode);
			});
		}


		processInput(){
			if(Key.isPress(Key.SPACE) && bandera == false){
				scoreP1 = 0;
				scoreP2 = 0;
				this.ball.vx = Math.cos(this.ball.angle) * 100;
				this.ball.vy = Math.sin(this.ball.angle) * 100;
				bandera = true;
				mensaje = "";
				mensaje2 = "";
				mensaje3 = "";
			}
			if(Key.isPress(Key.UP)){
				rect_y2 -= 5;
			}
			if(Key.isPress(Key.DOWN)){
				rect_y2 += 5;
			}
			if(Key.isPress(Key.ARRIBA)){
				rect_y -= 5;
			}
			if(Key.isPress(Key.ABAJO)){
				rect_y += 5;
			}
		}

		
		update(elapsed) {
			if(rect_y+(rect_h/2) > ch){
				rect_y -= 5;
			}
			if(rect_y-(rect_h/2) < 0){
				rect_y +=5;
			}
			if(rect_y2+(rect_h/2) > ch){
				rect_y2 -= 5;
			}
			if(rect_y2-(rect_h/2) < 0){
				rect_y2 +=5;
			}
			
			
			if(this.ball.vx > 800){
				this.ball.vx = this.ball.vx * 0.8;
			}
			
			//caso cuando la pelota pega con la barra roja
			if ( 34 > this.ball.x && (rect_y-(rect_h/2) <= this.ball.y && this.ball.y <= rect_y+(rect_h/2)) ){
				this.ball.vx *= -1;
				this.ball.vx = this.ball.vx * 1.3;
				audio.play();
			}
			//caso cuando la pelota pega con la barra azul
			if ( cw-36 < this.ball.x && (rect_y2-(rect_h/2) <= this.ball.y && this.ball.y <= rect_y2+(rect_h/2)) ){
				this.ball.vx *= -1;
				this.ball.vx = this.ball.vx * 1.3;
				audio.play();
			}
			

			//parte inferior de la barra roja
			if( (this.ball.x > 19 && this.ball.x < 36 ) && (this.ball.y > (rect_y+(rect_h/2)+3) && this.ball.y < (rect_y+(rect_h/2)+5) ) ){
				this.ball.vy *= -1;
				this.ball.vx *= -1;
			}

			
			//parte inferior de la barra azul
			if( (this.ball.x < cw-36) && (this.ball.y2 > (rect_y2+(rect_h/2))+5 && this.ball.y2 > (rect_y2+(rect_h/2)+3)) ){
				this.ball.vy *= -1;
				this.ball.vx *= -1;
			}
			

			//parte superior de la barra roja
			if( (this.ball.x > 19 && this.ball.x < 36 ) && (this.ball.y > (rect_y-(rect_h/2)-3) && this.ball.y < (rect_y-(rect_h/2)-5) ) ){
				this.ball.vy *= -1;
				this.ball.vx *= -1;
			}
			
			//parte superior de la barra azul
			if( (this.ball.x < cw-36) && (this.ball.y2 > (rect_y2-(rect_h/2))-5 && this.ball.y2 > (rect_y2-(rect_h/2)-3)) ){
				this.ball.vy *= -1;
				this.ball.vx *= -1;
			}


			//caso cuando la pelota pega con la barra roja por atras
			if ( 14 > this.ball.x && (rect_y-(rect_h/2) <= this.ball.y && this.ball.y <= rect_y+(rect_h/2)) ){
				this.ball.vx *= -1;
			}
			//caso cuando la pelota pega con la barra azul por atras
			if ( cw-16 < this.ball.x && (rect_y2-(rect_h/2) <= this.ball.y && this.ball.y <= rect_y2+(rect_h/2)) ){
				this.ball.vx *= -1;	
			}


			//caso cuando la bola pega en la pared izquierda
		    if (this.ball.x < this.ball.size) {
		    	this.ball.vx *= -1;
		        this.ball.x = this.ball.size;
		        scoreP2 += 1;
		        this.ball.vx = Math.cos(this.ball.angle) * 100;
		        this.ball.vy = Math.sin(this.ball.angle) * 100;
		        this.ball.x = 350;
		        this.ball.y = 250;
		    }
		    //caso cuando la bola pega en la pared derecha
		    if (this.ball.x > cw-this.ball.size) {
		        this.ball.vx *= -1;
		        this.ball.x = cw-this.ball.size;
		        scoreP1 += 1;
		        this.ball.vx = Math.cos(this.ball.angle) * 100;
		        this.ball.vy = Math.sin(this.ball.angle) * 100;
		        this.ball.x = 350;
		        this.ball.y = 250;
		    }
		    //caso cuando la bola pega arriba
		    if (this.ball.y < this.ball.size) {
		        this.ball.vy *= -1;
		        this.ball.y = this.ball.size;
		    }
		    //caso cuando la bola pega abajo
		    if (this.ball.y > ch-this.ball.size) {
		        this.ball.vy *= -1;
		        this.ball.y = ch-this.ball.size;
		    }
		    if(scoreP1 == 5){
		    	mensaje = "El jugador 1 gana!";
		    	mensaje2 = "Presiona espacio para reiniciar";
		    	this.ball.vx = 0;
		    	this.ball.vy = 0;
		    	audio2.play();
		    	bandera = false;
		    }else if(scoreP2 == 5){
		    	mensaje = "El jugador 2 gana!";
		    	mensaje2 = "Presiona espacio para reiniciar";
		    	this.ball.vx = 0;
		    	this.ball.vy = 0;
		    	audio2.play();
		    	bandera = false;
		    }

		    this.ball.update(elapsed);
	    }


		render(){
			this.ctx.clearRect(0, 0, cw, ch);
			this.ctx.beginPath();

			//pintamos una linea horizontal en el canvas
			this.ctx.moveTo(350,0);
			this.ctx.lineTo(350,500);
			this.ctx.stroke();


			//pintamos la bola
			this.ball.render(this.ctx);

			//pintamos la barra azul
			this.ctx.fillStyle = "blue";
			this.ctx.fillRect(rect_x2 - rect_w/2, rect_y2 - rect_h/2, rect_w, rect_h);

			//pintamos la barra roja
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(rect_x - rect_w/2, rect_y - rect_h/2, rect_w, rect_h);

			//pintamos los puntajes del primer jugador
			this.ctx.fillStyle = "white";
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 2;
			this.ctx.lineJoin = "round";
			this.ctx.font = "900 30px Arial";
			this.ctx.strokeText(scoreP1, 175, 60);
			this.ctx.fillText(scoreP1, 175, 60);


			//pintamos los puntajes del segundo jugador
			this.ctx.fillStyle = "white";
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 2;
			this.ctx.lineJoin = "round";
			this.ctx.font = "900 30px Arial";
			this.ctx.strokeText(scoreP2, 525, 60);
			this.ctx.fillText(scoreP2, 525, 60);


			//pintamos mensaje
			this.ctx.fillStyle = "white";
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 2;
			this.ctx.lineJoin = "round";
			this.ctx.font = "900 30px Arial";
			this.ctx.strokeText(mensaje, 200, 400);
			this.ctx.strokeText(mensaje2, 100, 450);
			this.ctx.strokeText(mensaje3, 200, 450);
			this.ctx.fillText(mensaje, 200, 400);
			this.ctx.fillText(mensaje2, 100, 450);
			this.ctx.fillText(mensaje3, 200, 450);
		}
	}

	GameEngine.Game = Game;
	return GameEngine;
})(GameEngine || {})