//#region
const gold = document.getElementById("gold");
const hp = document.getElementById("hp");
const attackpower = document.getElementById("attackpower");
const potions = document.getElementById("potions");
const defense = document.getElementById("defense");
const inventory = document.getElementById("inventory");
const dungeon = document.getElementById("dungeon");
const roomRepeater=document.getElementById("roomRepeater")
const player1=document.getElementById("player")
const lootbox=document.getElementById("lootbox")
const monsterbox=document.getElementById("monsterbox")

let encounter=document.getElementById("encounter")

//#endregion
let player = {
  gold: 1000,
  hp: 20,
  attackpower: 10,
  potions: 4,
  defense: 0,
  inventory: ["sword", "wool hat", "grappling hook"],
};
let Monster = function(name, hp, items, gold, attackpower) {
    this.name  = name;
    this.hp    = hp;
    this.items = items;
    this.gold = gold;
    this.attackpower = attackpower;
    this.dead = false
}
var monstersArray = [
	new Monster('Medusa', 10, ['stone rod'], 1, 4),
	new Monster('Cyclops', 20, ['goopy eye'], 1, 2),
	new Monster('Basilisk', 24, ['diary'], 5, 4),
	new Monster('GIANT!', 50, ['clubbing pants'], 0, 10),
	new Monster('Hydra', 20, ['one of three heads'], 25, 8),
	new Monster('BOSS MONSTER', 100, ['game winning item'], 1000000, 22),
	new Monster('Troll', 30, ['booger wand'], 30, 9),
	new Monster('Orc', 15, ['ugly mask'], 75, 9),
	new Monster('Pokemon', 1, ['tall grass'], 15, 0),
	new Monster('Wolf', 19, ['tooth'], 0, 6),
	new Monster('Chimera', 35, ['camera'], 60, 18),
	// new Monster(),
	// new Monster(),
	// new Monster(),
	// new Monster(),
]

var Room = function(active) {
    this.createMonster = function() {
        var randomNumber = Math.floor(Math.random() * 16)
        console.log(randomNumber)
        var selectedMonster = []
        selectedMonster.push(monstersArray[randomNumber])
        monstersArray.splice(randomNumber, 1)
        console.log(selectedMonster[0])
        return selectedMonster[0]
    }
    //console.log(this.createMonster)
    this.backgroundColor="red"
    this.active = false
    this.monster = this.createMonster()

}
rooms = [
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
	new Room(),
]
let t = 8
let l= 8
let activeRoom = rooms[0]
let activeIndex = 0
let activeMonster=[]
function input(e){

    if(e.keyCode  === 68 && l<258){
        l+=50
        player1.style.left =l+"px";
        activeMonster=[]
        activeIndex+=1
        activeRoom=rooms[activeIndex]
        if(activeRoom.monster != undefined&&activeRoom.monster.dead===false){
            activeMonster.push(activeRoom.monster)
        }
    }
    if(e.keyCode  === 65 && l>8){
        l-=50
        player1.style.left =l+"px";
        activeMonster=[]
        activeIndex-=1
        activeRoom=rooms[activeIndex]
        if(activeRoom.monster != undefined&&activeRoom.monster.dead===false){
            activeMonster.push(activeRoom.monster)
        }
    }
    if(e.keyCode  === 87 && t>8){
        t-=55
        player1.style.top =t+"px";
        activeMonster=[]
        activeIndex-=6
        activeRoom=rooms[activeIndex]
        if(activeRoom.monster != undefined&&activeRoom.monster.dead===false){
            activeMonster.push(activeRoom.monster)
        }
    }
    if(e.keyCode  === 83 && t<228){
        t+=55
        player1.style.top =t+"px";
        activeMonster=[]
        activeIndex+=6
        activeRoom=rooms[activeIndex]
        if(activeRoom.monster != undefined&&activeRoom.monster.dead===false){
            activeMonster.push(activeRoom.monster)
        }
    }
    console.log(activeMonster[0])
    let a = JSON.stringify(activeMonster[0])
    console.log(a)
    encountering(activeMonster[0])
}
function color(monster) {
if(monster===undefined){return "aqua"}
  switch (monster.name) {
    case 'Medusa':
      return "red"
      break;
    case 'Cyclops':
      return "orange ";
      break;
    case 'Basilisk':
      return "yellow"
      break;
    case 'GIANT!':
        return "green"
      break;
    case 'Hydra':
        return "blue"
      break;
    case 'BOSS MONSTER':
        return "indigo"
      break;
    case 'Troll':
        return "violet"
      break;
    case 'Orc':
      return "salmon"
      break;
    case 'Pokemon':
        return "magenta"
      break;
    case 'Wolf':
        return "honeydew"
      break;
    case 'Chimera':
        return "chartreuse"
      break;
    default:
        return "royalblue"
  }
}
function setstats() {
  gold.innerHTML = player.gold;
  hp.innerHTML = player.hp;
  attackpower.innerHTML = player.attackpower;
  potions.innerHTML = player.potions;
  defense.innerHTML = player.defense;
}
function setmonsterbox(){
  lootbox.hidden = true
  monsterbox.hidden = true
}
//#region states
setstats()
setmonsterbox()
player.inventory.pop()
additem("sand")
additem("candy")
listitem(player.inventory);
addgold(1000)
genroom(rooms)
document.addEventListener("keydown",input)
//#endregion
function encountering(monster){
    if(monster!=undefined){
        encounter.innerHTML=`you encounter a ${monster.name} it has ${monster.hp} health what will you do?`
        monsterbox.hidden=false
        
     }
    else{
        encounter.innerHTML=""
        monsterbox.hidden=true
    }

}
function attack(monster){
  monster.hp -= player.attackpower
  encounter.innerHTML=`you encounter a ${monster.name} it has ${monster.hp} health what will you do?`
}
function genroom(arr){ 
    arr.forEach((roo) => {
        const room = document.createElement("div");
        room.style.backgroundColor=color(roo.monster)
        room.classList.add("room")
        roomRepeater.appendChild(room);
      });
}
function listitem(arr) {
  arr.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("item")
    listItem.textContent = item;
    listItem.addEventListener("click", function() {
        console.log("You clicked on: " + item);
        
      });
    inventory.appendChild(listItem);
  });
}
function select(){
  
}
function hurt() {
  player.hp -=1
  setstats()
}
function drink(){
    if(player.potions > 0){
      player.hp+=10
      player.potions-=1
      setstats()
    }
}
function addgold(gold) {
  player.gold += gold
  setstats()
}
function additem(item){
    player.inventory.push(item)
}