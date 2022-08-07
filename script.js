let object_map = [];
let enemyX = 0;
let enemyY = 0;
let playerX = 0;
let playerY = 0;
let randomCoin = false;
let numberOfPits = 0;
let width = 0;
let height = 0;
let pits = [];
let node_links = [];
let node_map = [];
let available_directions = [];
let mainX = 0;
let mainY = 0;

let prohod = 1;

function debug_draw() {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			// document.getElementById('ps').innerText = document.getElementById('ps').innerText + '<p>';
			switch (node_map[x][y].type) {
				case 'node':
					document.getElementById('ps').innerText = document.getElementById('ps').innerText + '╋';
					break;
				case 'connection':
					switch (node_map[x][y].rotation) {
						case 0:
							document.getElementById('ps').innerText = document.getElementById('ps').innerText + '┏';
							break;
						case 1:
							document.getElementById('ps').innerText = document.getElementById('ps').innerText + '┓';
							break;
						case 2:
							document.getElementById('ps').innerText = document.getElementById('ps').innerText + '┛';
							break;
						case 3:
							document.getElementById('ps').innerText = document.getElementById('ps').innerText + '┗';
							break;
					}
					break;
				case 'connection2':
					if (node_map[x][y].rotation == 0) {
						document.getElementById('ps').innerText = document.getElementById('ps').innerText + '╱';
					} else {
						document.getElementById('ps').innerText = document.getElementById('ps').innerText + '╲';
					}
					break;
			}

			if (node_map[x][y].type == 'empty') {
				if (object_map[x][y].indexOf('Coin') != -1) {
					document.getElementById('ps').innerText = document.getElementById('ps').innerText + '┊';
				} else if (object_map[x][y].indexOf('Pit') != -1) {
					document.getElementById('ps').innerText = document.getElementById('ps').innerText + '!';
				} else {
					document.getElementById('ps').innerText = document.getElementById('ps').innerText + '┊';
				}
			}
		}
	document.getElementById('ps').innerText = document.getElementById('ps').innerText + '\n';
	}

	document.getElementById('ps').innerText = document.getElementById('ps').innerText + '\n';
	document.getElementById('ps').innerText = document.getElementById('ps').innerText + '_____________________________\n';
}

function random(max) {
  let rand = 0 - 0.5 + Math.random() * (max);
  let i = Math.round(rand);
  if (i == -0) {
  	i = 0;
  }
  return i;
}

function getNextTo(x, y, side) {
	switch (side) {
		case 'left':
			x--;
			break;
		case 'right':
			x++;
			break;
		case 'up':
			y--;
			break;
		case 'down':
			y++;
			break;
	}

	if (x == -1) {
		x = width - 1;
	} else if (x == width) {
		x = 0;
	}

	if (y == -1) {
		y = height - 1;
	} else if (y == width) {
		y = 0;
	}

	return {x:x, y:y};
}

function nextChain(x, y, rot) {
	console.log(`Запустилась ф-ция создания цепочки. Проверяем клетку ${x} ${y}.`)

/*	if (node_map[x][y].type == 'node') {
		node_map[x][y].right = true;
		return;
	} else if (node_map[x][y].type == 'connection2') {
		node_map[x][y].type = 'node';
	} else {
*/

	console.log('Изначально курсор направлен...');

	// Эту конвертацию можно убрать, если перестать подавать строки в ф-цию.
	switch (rot) {
		case 'left':
			rot = 2;
			console.log('влево.');
			break;
		case 'right':
			rot = 0;
			console.log('вправо.');
			break;
		case 'up':
			rot = 3;
			console.log('вверх.');
			break;
		case 'down':
			rot = 1;
			console.log('вниз.');
			break;
	}

	needEnd = true;
	for (chain_end = random(10); chain_end != 0; chain_end = random(2)) {
		console.log(`chain_end != 0: ${chain_end}`);	
		if (node_map[x][y].type == 'connection') {
			console.log(`На ${x} ${y} уже есть подключение, так что хорошенько подумав, мы...`);
			if (rot == 0) {
				switch (node_map[x][y].rotation) {
					case 0:
						node_map[x][y].type = 'connection2';
						rot = 3;
						console.log('превратим его в перекрёсток.');
						break;
					case 1:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
					case 2:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
					case 3:
						node_map[x][y].type = 'connection2';
						node_map[x][y].rotation = 1;
						rot = 1;
						console.log('превратим его в перекрёсток.');
						break;
				}
			} else if (rot == 1) {
				switch (node_map[x][y].rotation) {
					case 0:
						node_map[x][y].type = 'connection2';
						rot = 2;
						console.log('превратим его в перекрёсток.');
						break;
					case 1:
						node_map[x][y].type = 'connection2';
						rot = 0;
						console.log('превратим его в перекрёсток.');
						break;
					case 2:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
					case 3:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
				}
			} else if (rot == 2) {
				switch (node_map[x][y].rotation) {
					case 0:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
					case 1:
						node_map[x][y].type = 'connection2';
						rot = 3;
						console.log('превратим его в перекрёсток.');
						break;
					case 2:
						node_map[x][y].type = 'connection2';
						node_map[x][y].rotation = 0;
						rot = 1;
						console.log('превратим его в перекрёсток.');
						break;
					case 3:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
				}
			} else if (rot == 3) {
				switch (node_map[x][y].rotation) {
					case 0:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
					case 1:
						node_map[x][y].type = 'node';
						node_map[x][y].connections = 2;
						needEnd = false;
						console.log('превратим его в узел.');
						break;
					case 2:
						node_map[x][y].type = 'connection2';
						node_map[x][y].rotation = 0;
						rot = 0;
						console.log('превратим его в перекрёсток.');
						break;
					case 3:
						node_map[x][y].type = 'connection2';
						node_map[x][y].rotation = 1;
						rot = 2;
						console.log('превратим его в перекрёсток.');
						break;
				}
			}
		} else if (node_map[x][y].type == 'node') {
			console.log('Встречен узел, придётся объявить его концом цепочки!')
			needEnd = false;
			break;
		} else {
			console.log(`Эта клетка свободна, ставим соединение на ${x} ${y}...`);
			node_map[x][y].type = 'connection';
			switch (rot) {
				case 0:
					if (random(2)) {
						rot = 3;
						console.log('Ставим ◞.');
						node_map[x][y].rotation = 2;
					} else {
						rot = 1;
						console.log('Ставим ◝.');
						node_map[x][y].rotation = 1;
					}
					break;
				case 1:
					if (random(2)) {
						rot = 0;
						console.log('Ставим ◟.');
						node_map[x][y].rotation = 3;
					} else {
						rot = 2;
						console.log('Ставим ◞.');
						node_map[x][y].rotation = 2;
					}
					break;
				case 2:
					if (random(2)) {
						rot = 1;
						console.log('Ставим ◜.');
						node_map[x][y].rotation = 0;
					} else {
						rot = 3;
						console.log('Ставим ◟.');
						node_map[x][y].rotation = 3;
					}
					break;
				case 3:
					if (random(2)) {
						rot = 2;
						console.log('Ставим ◝.');
						node_map[x][y].rotation = 1;
					} else {
						rot = 0;
						console.log('Ставим ◜.');
						node_map[x][y].rotation = 0;
					}
					break;
			}
		}

		console.log(`Поворот курсора: ${rot}`);

		console.log(`Перемещаем курсор с ${x} ${y} на...`);

		// Move the cursor:
		switch (rot) {
			case 0:
				nextTo = getNextTo(x, y, 'right');
				x = nextTo.x;
				y = nextTo.y;
				break;
			case 1:
				nextTo = getNextTo(x, y, 'down');
				x = nextTo.x;
				y = nextTo.y;
				break;
			case 2:
				nextTo = getNextTo(x, y, 'left');
				x = nextTo.x;
				y = nextTo.y;
				break;
			case 3:
				nextTo = getNextTo(x, y, 'up');
				x = nextTo.x;
				y = nextTo.y;
				break;
		}

		console.log(`${x} ${y}.`);

		console.log('ЗАКОММЕНТИРОВАНО Поворачиваем курсор...');

/*		dice3 = random(2);
		if (dice3 == 0) {
			rot += 1;
			if (rot == 4) {
				rot = 0;
			}
		} else {
			rot -= 1;
			if (rot == -1) {
				rot = 3;
			}
		}
*/
		console.log(`Новый поворот курсора: ${rot}`);
	}

	console.log(`chain_end == ${chain_end}`);
	console.log(`needEnd == ${needEnd}`);

	if (needEnd) {
		console.log(`needEnd == true, так что ищем следующую клетку`);
		/*switch (rot) {
			case 0:
				[x, y] = getNextTo(x, y, 'right');
				break;
			case 1:
				[x, y] = getNextTo(x, y, 'down');
				break;
			case 2:
				[x, y] = getNextTo(x, y, 'left');
				break;
			case 3:
				[x, y] = getNextTo(x, y, 'up');
				break;
		}*/
		console.log(`Ставим узел на ${x} ${y}`);
		node_map[x][y].type = 'node';
		// node_map[x][y].connections += 1;
		// Здесь нужно будет сделать добавление узла в список доступных.
		node_links.push([x, y]);
	}

	console.log('Цепочка окончена.')

	prohod += 1
	console.log(prohod);/*
	if (prohod == 2) {
		return;
	}*/
}

function refreshNode(x, y) {

	mainX = x;
	mainY = y;

	node_map[mainX][mainY].connections = 0;

	console.log(`Для ${x} ${y} запустилось обновление кол-ва соединений (refreshNode()).`);

	node_map[mainX][mainY].right = false;
	node_map[mainX][mainY].down = false;
	node_map[mainX][mainY].left = false;
	node_map[mainX][mainY].up = false;

	nextTo = getNextTo(mainX, mainY, 'right');
	if (node_map[nextTo.x][nextTo.y].type == 'node' || node_map[nextTo.x][nextTo.y].type == 'connection2') {
		node_map[mainX][mainY].right = true;
		node_map[mainX][mainY].connections += 1;
	} else if (node_map[nextTo.x][nextTo.y].type == 'connection') {
		if (node_map[nextTo.x][nextTo.y].rotation == 1 || node_map[nextTo.x][nextTo.y].rotation == 2) {
			node_map[mainX][mainY].right = true;
			node_map[mainX][mainY].connections += 1;
		}
	}	
	
	nextTo = getNextTo(mainX, mainY, 'down');
	if (node_map[nextTo.x][nextTo.y].type == 'node' || node_map[nextTo.x][nextTo.y].type == 'connection2') {
		node_map[mainX][mainY].down = true;
		node_map[mainX][mainY].connections += 1;
	} else if (node_map[nextTo.x][nextTo.y].type == 'connection') {
		if (node_map[nextTo.x][nextTo.y].rotation == 2 || node_map[nextTo.x][nextTo.y].rotation == 3) {
			node_map[mainX][mainY].down = true;
			node_map[mainX][mainY].connections += 1;
		}
	}
	
	nextTo = getNextTo(mainX, mainY, 'left');
	if (node_map[nextTo.x][nextTo.y].type == 'node' || node_map[nextTo.x][nextTo.y].type == 'connection2') {
		node_map[mainX][mainY].left = true;
		node_map[mainX][mainY].connections += 1;
	} else if (node_map[nextTo.x][nextTo.y].type == 'connection') {
		if (node_map[nextTo.x][nextTo.y].rotation == 0 || node_map[nextTo.x][nextTo.y].rotation == 3) {
			node_map[mainX][mainY].left = true;
			node_map[mainX][mainY].connections += 1;
		}
	}
	
	nextTo = getNextTo(mainX, mainY, 'up');
	if (node_map[nextTo.x][nextTo.y].type == 'node' || node_map[nextTo.x][nextTo.y].type == 'connection2') {
		node_map[mainX][mainY].up = true;
		node_map[mainX][mainY].connections += 1;
	} else if (node_map[nextTo.x][nextTo.y].type == 'connection') {
		if (node_map[nextTo.x][nextTo.y].rotation == 0 || node_map[nextTo.x][nextTo.y].rotation == 1) {
			node_map[mainX][mainY].up = true;
			node_map[mainX][mainY].connections += 1;
		}
	}
}

function add_path(x, y) {

	console.log(`|||Выпало добавление пути (запуск add_path()). В начале выведем карту...`);

	debug_draw();

	refreshNode(x, y);

	available_directions = ['left', 'right', 'up', 'down'];

	console.log(`Вот занятость сторон узла right down left up: ${node_map[x][y].right} ${node_map[x][y].down} ${node_map[x][y].left} ${node_map[x][y].up}`);

	console.log('Сейчас вычислим доступные стороны...');

	// Удалить недоступные (использованные) стороны из списка:------------------

	console.log(available_directions);

	if (node_map[x][y].left) {
		available_directions.splice(available_directions.indexOf('left'), 1);
		console.log('Убираем влево');
		console.log(available_directions);
	}

	if (node_map[x][y].right) {
		available_directions.splice(available_directions.indexOf('right'), 1);
		console.log('Убираем вправо');
		console.log(available_directions);
	}

	if (node_map[x][y].up) {
		available_directions.splice(available_directions.indexOf('up'), 1);
		console.log('Убираем вверх');
		console.log(available_directions);
	}

	if (node_map[x][y].down) {
		available_directions.splice(available_directions.indexOf('down'), 1);
		console.log('Убираем вниз');
		console.log(available_directions);
	}

	// -------------------------------------------------------------------------

	// Выбор, к какой стороне узла добавлять путь:
	let dice = random(available_directions.length);
	let nextTo = [0, 0];
	console.log(`Вот вычисленные доступные стороны выбранного узла: ${available_directions}`);
	switch (available_directions[dice]) {
		case 'left':
			nextTo = getNextTo(x, y, 'left');
			node_map[x][y].left = true;
			console.log('Начинаем цепочку влево.')
			console.log(`Кстати, координаты взятого узла - ${x} ${y}.`);
			nextChain(nextTo.x, nextTo.y, 'left');
			break;
		case 'right':
			nextTo = getNextTo(x, y, 'right');
			node_map[x][y].right = true;
			console.log('Начинаем цепочку вправо.')
			console.log(`Кстати, координаты взятого узла - ${x} ${y}.`);
			nextChain(nextTo.x, nextTo.y, 'right');
			break;
		case 'up':
			nextTo = getNextTo(x, y, 'up');
			node_map[x][y].up = true;
			console.log('Начинаем цепочку вверх.')
			console.log(`Кстати, координаты взятого узла - ${x} ${y}.`);
			nextChain(nextTo.x, nextTo.y, 'up');
			break;
		case 'down':
			nextTo = getNextTo(x, y, 'down');
			node_map[x][y].down = true;
			console.log('Начинаем цепочку вниз.')
			console.log(`Кстати, координаты взятого узла - ${x} ${y}.`);
			nextChain(nextTo.x, nextTo.y, 'down');
			break;
	}

	// node_map[nextTo.x][nextTo.y].connections += 1;

// Непонятно, откуда взялось:
/*	if (node_map[x - 1][y].type == 'node') {
		node_map[x - 1][y].connections += 1;
	}
*/
}

class Enemy {
	// Зачем этот класс?
}

class Node {
	constructor(type = 'node', rotation = 0) {
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		this.connections = 0;
		this.type = type;
		this.rotation = rotation;
	}
}


function generate() {
	pits = [];
	document.getElementById("submitButton").disabled = true;

	width = document.getElementById("width").value;
	height = document.getElementById("height").value;

	// Array declaration:
	for (let x = 0; x < width; x++) {
		object_map[x] = [];

		for (let y = 0; y < height; y++) {
			object_map[x][y] = [];

			// Put a coin:
			randomCoin = random(10);
			if (randomCoin == 1) {
			object_map[x][y].push("Coin");
			}
			// object_map[x][y].push("Coin"); // test

/*			object_map[i][j] = {
				WallUp: false,
				WallDown: false,
				WallLeft: false,
				WallRight: false,
			} 
*/

		}
	}

	// Node map declaration:
	for (x = 0; x < width; x++) {
		node_map[x] = [];

		for (y = 0; y < height; y++) {
			// Create an empty node:
			node_map[x][y] = new Node('empty');
		}
	}

	// Create a node in random place:
	x = random(width);
	y = random(height);
	node_map[x][y] = new Node;

	// Add a link to the array of node_links:
	node_links.push([x, y]);

	// Create branches for all node_links:
	while (node_links.length > 0 && prohod < 20 && node_map[node_links[0][0]][node_links[0][1]].connections < 5) {

		console.log(`Итак, у нас ${node_links.length} доступных узлов.`);
		
		console.log(`У первого узла (${node_links[0][0]} ${node_links[0][1]}), находящегося в списке доступных, есть ${node_map[node_links[0][0]][node_links[0][1]].connections} соединения.`);

		chance = random(100);

		switch (node_map[node_links[0][0]][node_links[0][1]].connections) {
			case 0:
				console.log('На основе занятых сторон решаем добавить путь со 100% шансом...');
				// Добавить путь со 100% шансом:
				add_path(node_links[0][0], node_links[0][1]);
				node_map[node_links[0][0]][node_links[0][1]].connections += 1;
				console.log(`Увеличили счётчик соединений. Теперь у ${node_links[0][0]} ${node_links[0][1]} стало ${node_map[node_links[0][0]][node_links[0][1]].connections} соединений.`);
				break;
			case 1:
				console.log('На основе занятых сторон решаем добавить путь с 90% шансом...');
				
				// Добавить путь с 75% шансом:
				if (chance <= 90) {
					add_path(node_links[0][0], node_links[0][1]);
					node_map[node_links[0][0]][node_links[0][1]].connections += 1;
					console.log(`Увеличили счётчик соединений. Теперь у ${node_links[0][0]} ${node_links[0][1]} стало ${node_map[node_links[0][0]][node_links[0][1]].connections} соединений.`);
				} else {
					console.log('Не выпало нужное число. Удаляем узел из списка доступных.')
					node_links.shift();
				}
				
				break;
			case 2:
				console.log('На основе занятых сторон решаем добавить путь с 50% шансом...');
				
				// Добавить путь с 50% шансом:
				if (chance <= 50) {
					add_path(node_links[0][0], node_links[0][1]);
					node_map[node_links[0][0]][node_links[0][1]].connections += 1;
					console.log(`Увеличили счётчик соединений. Теперь у ${node_links[0][0]} ${node_links[0][1]} стало ${node_map[node_links[0][0]][node_links[0][1]].connections} соединений.`);
				} else {
					console.log('Не выпало нужное число. Удаляем узел из списка доступных.')
					node_links.shift();
				}
				
				break;
			case 3:
				console.log('На основе занятых сторон решаем добавить путь с 25% шансом...');
				
				// Добавить путь с 25% шансом:
				if (chance <= 25) {
					add_path(node_links[0][0], node_links[0][1]);
					node_map[node_links[0][0]][node_links[0][1]].connections += 1;
					console.log(`Увеличили счётчик соединений. Теперь у ${node_links[0][0]} ${node_links[0][1]} стало ${node_map[node_links[0][0]][node_links[0][1]].connections} соединений.`);
				} else {
					console.log('Не выпало нужное число. Удаляем узел из списка доступных.')
					node_links.shift();
				}
				
				break;
			case 4:
				// Удалить перебираемый узел из списка доступных:
				console.log(`У узла ${x} ${y} нет доступных сторон, удаляем из списка доступных узлов.`)
				node_links.shift();
				break;
		}
	}

	console.log(`debug ${node_links.length}`);

	if (node_map[node_links[0][0]][node_links[0][1]].connections < 4) {
		console.log(`Внимание, на  ${node_links[0][0]} ${node_links[0][1]} странное кол-во соединений: ${node_map[node_links[0][0]][node_links[0][1]].connections}.`);	
	}

	console.log('Доступных узлов не осталось, генерация карты узлов окончена! Ну или цикл прерван для отладки...')

	// Here the map will be built based on the node map...

	// Fill up an array of pits and delete coins:
	numberOfPits = document.getElementById("numberOfPits").value;
	for (let i = 0; i < numberOfPits; i++) {
		pits[i] = [];

		pits[i].push(random(width));
		pits[i].push(random(height));

		// Delete coin:
		let j = object_map[pits[i][0]][pits[i][1]].indexOf("Coin");
		if (j !== -1) {
			object_map[pits[i][0]][pits[i][1]].splice(j, 1);
		}
	}

	// Spawn a player:
	playerX = random(width);
	playerY = random(height);

	// Delete coin on player's tile:
	i = object_map[playerX][playerY].indexOf("Coin");
		if (i !== -1) {
		object_map[playerX][playerY].splice(i, 1);
	}

	// Spawn an enemy:
	enemyX = random(width);
	enemyY = random(height);

	// Delete coin on enemy's tile:
	i = object_map[enemyX][enemyY].indexOf("Coin");
	if (i !== -1) {
		object_map[enemyX][enemyY].splice(i, 1);
	}

	object_map[enemyX][enemyY].push("Enemy");	

	document.getElementById("submitButton").disabled = false;
	console.log(node_map);
}


function sample() {
	document.getElementById('width').value = '10';
	document.getElementById('height').value = '10';
	document.getElementById('numberOfPits').value = '3';
}