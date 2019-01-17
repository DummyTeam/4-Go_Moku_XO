
var XPosition = 0;
var YPosition = 0;

var cross_class = "cross";
var ring_class = "ring";

var ring_color = '#e42727';
var cross_color = '#34b3a0';

var counter = 0;
var visited;

var num_of_rows = 20;
var num_of_columns = 28;

var sizeOfCell =30;

var lastMove = '';

cross_player_id = 1;
ring_player_id = 2;

var combo_for_win = 5;

var slide_coefficientX = 0;
var slide_coefficientY = 0;
var ring_counter = 0;
var cross_counter = 0;

var game_over = false;


var victory_text = ' <img src="images/white_logo_xo.png" width="110" style="position: absolute; margin: auto; margin-top: 55px;"> You win, X Player!';

var opacity_anim_class = "opacity-animational";



function putACrossHere () {

	var ok = true;
	if (ok === true) 
	{

		XPosition -= slide_coefficientX;
		YPosition -= slide_coefficientY;

		XPosition = XPosition - (XPosition%sizeOfCell);
		YPosition = YPosition - (YPosition%sizeOfCell);

		y = YPosition/sizeOfCell;
		x = XPosition/sizeOfCell;

		if (visited[x][y] > 0) 
		{
			return;
		}

		var ring_turn = document.getElementById('ring_turn');
		var cross_turn = document.getElementById('cross_turn');

		var div = document.createElement('div');

		counter++;


		var r_or_c= 0;
		

		if(counter%2 != 0)
		{
			div.className = cross_class;
			r_or_c= cross_player_id;
			
			cross_turn.innerHTML = (++cross_counter+'');

			ring_turn.parentNode.className += " "+ opacity_anim_class;
			cross_turn.parentNode.className = removeLastWord(cross_turn.parentNode.className);

		}else{
			div.className = ring_class;
			r_or_c= ring_player_id;
			
			ring_turn.innerHTML = (++ring_counter+'');
			
			ring_turn.parentNode.className = removeLastWord(ring_turn.parentNode.className);
			cross_turn.parentNode.className += " " + opacity_anim_class;

		}
		counter %= 2;

		var left_sum = slide_coefficientX + XPosition;
		var top_sum = slide_coefficientY + YPosition;

		div.style.left = left_sum+"px";
		div.style.top = top_sum+"px";


		div.id = "x" + x+"-y" + y + "-p" + r_or_c;
		lastMove = div.id;
		div.style.position = "absolute";


		//TODO: Create all div-s beforehand with position containing id-s
		//		for creating hover effect to increase UX and UI design!
		document.getElementById('matharea').appendChild(div); 
		visited[x][y] = r_or_c;
		

		if(checkForWin(x,y,r_or_c) == true)
		{
			//alert("You win, player " + r_or_c +" !!!" );
			var foreground_layer = document.getElementById('foreground');
			foreground_layer.style.display = "block";
			var win_container = document.getElementById('win-block');
			win_container.innerHTML = replaceWinnerName(div.className);
			win_container.style.display = "block";
			win_container.style.backgroundColor = (r_or_c == 1) ? cross_color : ring_color;
		}
	}
};

function checkForWin(x , y, player)
{
	var check_value = combo_for_win-1;
	var result = checkVertical(x, y, player, check_value);
	result = ( result || checkHorizontal(x, y, player , check_value) );
	result = ( result || checkFirstDiagonal(x, y, player, check_value) );
	result = ( result || checkSecondDiagonal(x, y, player, check_value) );
	return result;
}

function checkVertical(x, y, player, check_value)
{
	var up_cont = true;
	var up_counter = 0;
	var down_counter = 0;
	var down_cont = true;

	for(var i = y+1, j = y-1;  (i < num_of_rows || j >= 0) && (up_cont || down_cont) ; i++, j--)
	{
		if(i < num_of_rows && up_cont && visited[x][i] == player)
		{
			up_cont= true;
			up_counter ++;
		}
		else
		{
			up_cont= false;

		}

		if(j >= 0 && down_cont && visited[x][j] == player)
		{
			down_cont= true;
			down_counter++;
		}
		else
		{
			down_cont = false;
		}
	}

	if(down_counter + up_counter == check_value)
	{
		return true;
	}
	return false;
}

function checkHorizontal(x, y, player, check_value)
{
	var right_cont = true;
	var right_counter = 0;
	var left_counter = 0;
	var left_cont = true;

	for(var i = x+1, j = x-1;  (i < num_of_columns || j >= 0) && (right_cont || left_cont) ; i++, j--)
	{
		if(i < num_of_columns && right_cont && visited[i][y] == player)
		{
			right_cont= true;
			right_counter ++;
		}
		else
		{
			right_cont= false;

		}

		if(j >= 0 && left_cont && visited[j][y] == player)
		{
			left_cont= true;
			left_counter++;
		}
		else
		{
			left_cont = false;
		}
	}

	if(left_counter + right_counter == check_value)
	{
		return true;
	}
	return false;
}

function checkFirstDiagonal(x, y, player, check_value)
{
	var up_cont = true;
	var up_counter = 0;
	var down_counter = 0;
	var down_cont = true;

	for(var yup = y-1, xup = x-1,   ydown = y+1 , xdown = x+1;  
		((ydown < num_of_rows && xdown < num_of_columns) || (yup >= 0 && xup >= 0 ) ) && (up_cont || down_cont); 
		yup--,ydown++,xup--, xdown++)
	{
		if(xup >= 0 && yup >= 0 && up_cont && visited[xup][yup] == player)
		{
			up_cont= true;
			up_counter ++;
		}
		else
		{
			up_cont= false;

		}

		if(xdown < num_of_columns && ydown < num_of_rows && down_cont && visited[xdown][ydown] == player)
		{
			down_cont= true;
			down_counter++;
		}
		else
		{
			down_cont = false;
		}
	}

	if(down_counter + up_counter == check_value)
	{
		return true;
	}
	return false;
}

function checkSecondDiagonal(x, y, player, check_value)
{
	var up_cont = true;
	var up_counter = 0;
	var down_counter = 0;
	var down_cont = true;

	for(var yup = y-1, xup = x+1,   ydown = y+1 , xdown = x-1;  
		((ydown < num_of_rows && xdown >= 0) || (yup >= 0 && xup < num_of_columns ) ) && (up_cont || down_cont); 
		yup--,ydown++,xup++, xdown--)
	{
		if(xup <num_of_columns && yup >= 0 && up_cont && visited[xup][yup] == player)
		{
			up_cont= true;
			up_counter ++;
		}
		else
		{
			up_cont= false;

		}

		if(xdown >= 0 && ydown < num_of_rows && down_cont && visited[xdown][ydown] == player)
		{
			down_cont= true;
			down_counter++;
		}
		else
		{
			down_cont = false;
		}
	}

	if(down_counter + up_counter == check_value)
	{
		return true;
	}
	return false;
}

function mainLoop()
{
	visited = new Array(num_of_columns);
	for (var i = 0; i < num_of_columns; i++) {
		visited[i] = new Array(num_of_rows);
		for (var j = 0; j < num_of_rows; j++) {
			visited[i][j] = 0;
		}
	}

	onmousedown = function(e)
	{
		XPosition = e.clientX;
		YPosition = e.clientY;	
	}
}

function removeLastWord(words) {
	var n = words.split(" ");
	
	if (n[n.length-1] != opacity_anim_class) {return words;}

	var str = "";

	for (var i = 0; i < n.length-1; i++) 
	{
		str += n[i] + " ";
	}

	return str;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function replaceWinnerName(winner) {
	var n = victory_text.split(" ");

	var str = "";
	for (var i = 0; i < n.length; i++) 
	{
		if (n[i] == 'X') 
		{
			n[i] = capitalizeFirstLetter(winner);
		}
		str += n[i] + ((i == n.length-1) ? "" : " ");
	}
	return str;
}

function undo()
{
	//	div.id = "x" + x+"-y" + y + "-p" + r_or_c;
	if (lastMove == "") {
		alert("You can use 'Undo' only once!");
		return;
	}
	var element = document.getElementById(lastMove);
	element.outerHTML = "";
	delete element;
	var temp_x;
	var temp_y;
	var n = lastMove.split('-');
	temp_x = n[0].slice(1)
	temp_y = n[1].slice(1)
	visited[temp_x][temp_y] = 0;

	counter++;
	counter %= 2;
	(counter == 0) ? cross_counter -- : ring_counter--;

	lastMove = "";

}