// Task 1
const blockX = document.getElementById('blockThree');
const blockY = document.getElementById('blockSix');

function swapBlockInfo (block1, block2) {
    let tmp = block2.textContent
    block2.textContent = block1.textContent
    block1.textContent = tmp
}

blockX.onclick = () => swapBlockInfo(blockX,blockY)
blockY.onclick = () => swapBlockInfo(blockX,blockY)


//Task 2
const a = 12;
const b = 6;
const h = 3;
const text = document.getElementById('blockFive');
text.textContent = " ( " + a + " + " + b + " ) / 2 * " + h;

text.onclick = () => {
	let area = (a+b)*h/2;
	let tmp = ' = ' + area.toString()
	if (!text.textContent.endsWith(tmp)) text.textContent += tmp
}


//Task 3
document.getElementById('calculate').onclick = () => findDividers();
if (document.cookie) hasCookies();

function findDividers(){
    let form = document.forms.divider;
    let elem = form.elements.number.value;
    let arr = [];
    let ind = 0;
    
    for (i = 1; i <= elem; i++){
        if (elem % i == 0){
            arr[ind] = i;
            ind ++;
        }
    }

    alert(
        "Дільники числа " + elem + ": " + "\n" + arr
    );
    document.cookie = "Дільники числа " + elem + ": " + "\n" + arr;
}

function hasCookies() {
	if (confirm(document.cookie + "\n" + "Save?")) {
		alert("Cookies are saved");
		let form = document.forms.divider;
		form.elements.number.style.visibility = 'hidden'
		form.elements.calculate.style.visibility = 'hidden'
		// form.elements.numbers.remove()
		// form.elements.calculate.remove()
	} else {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			let eqPos = cookie.indexOf("=");
			let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
			document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
}


//Task 4
document.getElementsByTagName('body')[0].onload = () => {
    document.getElementById('blockFour').textContent = localStorage.getItem("text");
    //document.getElementById('four').style.fontWeight = localStorage.getItem("fontWeight")
    document.getElementById("checker").checked = (localStorage.getItem("radio") === 'true');

    const cssStyles = localStorage.getItem('CSS-Styles')
    if (cssStyles === null) {
        localStorage.setItem('CSS-Styles','')
        return
    }
    const styles = cssStyles.split('$')
    for (let counter = 0; counter < styles.length; counter++) {
        if (styles[counter] === "null" || styles[counter].length < 2) {
            continue
        }
        const arr = styles[counter].split(';')
		const id =  arr[0]
		const style =  arr[1]
		const setting =  arr[2]
		addCssSetting(id,style,setting)
		alert(style)
	}
};

document.getElementById("save").onclick = () => {
   if (document.getElementById("checker").checked) {
       let string = document.getElementById('blockFour').textContent;
       let textUpper = string.split(" ")
           .map(word => word.substring(0,1).toUpperCase() + word.substring(1, word.length)).join(' ');
       localStorage.setItem("text", textUpper);
       localStorage.setItem("radio", 'true');
       document.getElementById('blockFour').style.fontWeight = textUpper;
	}
    else {
       let string = document.getElementById('blockFour').textContent;
       let textLower = string.split(" ")
           .map(word => word.substring(0,1).toLowerCase() + word.substring(1, word.length)).join(' ');
       localStorage.setItem("text", textLower);
       localStorage.setItem("radio", 'false');
       document.getElementById('blockFour').style.fontWeight = textLower;
	}
}

document.getElementById("checker").addEventListener('change', function() {
    let string = document.getElementById('blockFour').textContent;
    let textUpper = string.split(" ")
        .map(word => word.substring(0,1).toUpperCase() + word.substring(1, word.length)).join(' ');
      
    if (string == textUpper){
        document.getElementById("checker").checked = false;
        let textLower = string.split(" ")
            .map(word => word.substring(0,1).toLowerCase() + word.substring(1, word.length)).join(' ');
        document.getElementById('blockFour').textContent = textLower;
    }
    else {
        document.getElementById("checker").checked = true;
        document.getElementById('blockFour').textContent = textUpper;
    }
    
} );

//Task 5
let hiddenBlock = document.getElementById("numListForm-2");
hiddenBlock.hidden = true;

localStorage.setItem("listItems-1","");
localStorage.setItem("listItems-2","");
let mass = "";

let blockx = document.getElementById("xBlock");
blockx.onclick = () => {
    let hiddenBlock = document.getElementById("numListForm-2");
    hiddenBlock.hidden = false;
}

function listCreator(current)
{
    document.getElementById("numListBlock-"+current).setAttribute("class", "");
    document.getElementById("listCreator-"+current).setAttribute("class", "hidden");
}

function addListElement(current)
{
    //создание элемента списка
    let addedText = document.getElementById(`inputSRC`).value;
    let li = document.createElement("li");
    li.setAttribute("class", `listItem-${current}`);
    let index = document.getElementsByClassName(`listItem-${current}`).length;
    li.setAttribute("index", index.toString());
    let image = document.createElement("img");
    image.src = addedText;
    let buttonDel = document.createElement('button');
    buttonDel.textContent = "Delete";
    buttonDel.onclick = function() {deleteListElement( this,"+current+")};
    li.appendChild(image);
    li.appendChild( buttonDel);
    document.getElementById(`numList-${current}`).appendChild(li);


    mass = mass.split(";$;")
    mass.push(addedText);
    mass = mass.join(";$;");
    listSaver(current);
}
function deleteListElement(me, current)
{
    let index = me.parentElement.getAttribute("index");
    // //удаление из localStorage
    mass = localStorage.getItem(`listItems-${current}`);
    mass = mass.split(";$;");
    mass.splice(index, 1);
    mass = mass.join(";$;")
     localStorage.setItem(`listItems-${current}`, mass);

    //удаление из HTML
    me.parentElement.parentElement.removeChild(me.parentElement);

    //распределение новых индексов
    let elemList = document.getElementsByClassName(`listItem-${current}`);
    for(let i = 0; i<elemList.length;i++)
    {
        elemList[i].setAttribute("index", i);
    }
}

function listSaver(current)
{
    localStorage.setItem(`listItems-${current}`, mass);
    document.getElementById(`numListForm-${current}`).setAttribute("class","hidden" );
}
