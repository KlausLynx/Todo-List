var lists = document.getElementById("lists");
console.log(lists);
var button = document.getElementById("checks");
console.log(button);
var input = document.getElementById("userinput");
console.log(input);
const themeImage = document.getElementById('season');
console.log(themeImage)
const uls1 = document.getElementById('uls1');
console.log(uls1);
const uls2 = document.getElementById('uls2');
console.log(uls2);
const uls3 = document.getElementById('uls3');
console.log(uls3);
const uls4 = document.getElementById('uls4');
console.log(uls4);
const uls5 = document.getElementById('uls5');
console.log(uls5);
const uls6 = document.getElementById('uls6');
console.log(uls6);
const list = document.querySelectorAll('li')
console.log(list);
const liHtml_1 = document.getElementById('check_1');
console.log(liHtml_1);
const liHtml_2 = document.getElementById('check_2');
console.log(liHtml_2);
const liHtml_3 = document.getElementById('check_3');
console.log(liHtml_3);
const liHtml_4 = document.getElementById('check_4');
console.log(liHtml_4);
const liHtml_5 = document.getElementById('check_5');
console.log(liHtml_5);
const liHtml_6 = document.getElementById('check_6');
console.log(liHtml_6);
const inputHtml_1 = document.getElementById('input_1');
console.log(inputHtml_1);
const inputHtml_2 = document.getElementById('input_2');
console.log(inputHtml_2);
const inputHtml_3 = document.getElementById('input_3');
console.log(inputHtml_3);
const inputHtml_4 = document.getElementById('input_4');
console.log(inputHtml_4);
const inputHtml_5 = document.getElementById('input_5');
console.log(inputHtml_5);
const inputHtml_6 = document.getElementById('input_6');
console.log(inputHtml_6);
const cross1 = document.getElementById('cross1');
console.log(cross1);
const cross2 = document.getElementById('cross2');
console.log(cross2);
const cross3 = document.getElementById('cross3');
console.log(cross3);
const cross4 = document.getElementById('cross4');
console.log(cross4);
const cross5 = document.getElementById('cross5');
console.log(cross5);
const cross6 = document.getElementById('cross6');
console.log(cross6);
var unorderedListdisplay;
var checkedAndCreatedListTotal;
var checkedCreatedListTotal;
var createdClassnameList;
var checkboxes;
var maincheckboxes;
var uncheckedCount;
var mainUnorderedLists;
var mainuncheckedCount;
var unorderedHtmlListdisplay = lists.querySelectorAll('ul');
var unorderedList;

////////// Number of html ul \\\\\\\\\\
document.querySelector('span').textContent = unorderedHtmlListdisplay.length + ' ';

//////////Adding dynamics to the "X" image\\\\\\\\\\
function showCross(element) {
    const crossDiv = element.querySelector('.cross');
    crossDiv.style.display = 'block';
}

function hideCross(element) {
    const crossDiv = element.querySelector('.cross');
    crossDiv.style.display = 'none';
}

////////// Background dynamics \\\\\\\\\\
const themeHandleChanges = window.matchMedia('(prefers-color-scheme:dark)')
function handleThemeChange(event) {
    if (event.matches) {
        themeImage.src = 'icon-sun.svg';
    } else {
        themeImage.src = 'icon-moon.svg';
    }
}
handleThemeChange(themeHandleChanges)
themeHandleChanges.addEventListener('change', handleThemeChange);

////////// Adding List \\\\\\\\\\
function inputLength() {
    return input.value.length;
}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterkeypress(event) {
    if (inputLength() > 0 && event.keyCode === 13) {
        createListElement();
    }
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterkeypress);

////////// Getting the length of every ul in the list \\\\\\\\\\
function updateTotalLists() {
    var totalLists = document.querySelectorAll('.lists ul').length;
    console.log(totalLists)
}

////////// Knowing the checkbox checked && unchecked \\\\\\\\\\
function updateCheckboxCount() {
    var checkboxes = lists.querySelectorAll('.circle-checkbox');
    var totalCheckboxes = checkboxes.length;
    var uncheckedCheckboxes = Array.from(checkboxes).filter(checkbox => !checkbox.checked).length;

console.log('Total Checkboxes:', totalCheckboxes);
document.querySelector('span').textContent = totalCheckboxes + ' '
console.log('Unchecked Checkboxes:', uncheckedCheckboxes);
document.querySelector('span').textContent = uncheckedCheckboxes + ' '
}

////////// Listens to call the function above \\\\\\\\\\
lists.addEventListener('change', function(event) {
    if (event.target.classList.contains('circle-checkbox')){
        updateCheckboxCount()
    }
});

////////// Calls the function below and toggles the classlist\\\\\\\\\\
document.querySelectorAll('.cross').forEach(htmlCross => {
    htmlCross.addEventListener('click', function() {
        // Toggle the 'clicked' class when a cross is clicked
        htmlCross.classList.toggle('clicked');
        
        // Update the count of unclicked cross elements
        updateUnclickedCrossCount();
    });
});

////////// Checks for unclicked checkbox && cross \\\\\\\\\\
function updateUnclickedCrossCount() {
    var unclickedCrosses = document.querySelectorAll('.cross:not(.clicked)');
    var uncheckedCheckboxes = document.querySelectorAll('.circle-checkbox:not(:checked)');
    var count = 0;

    unclickedCrosses.forEach(function(cross) {
        var checkbox = cross.parentElement.parentElement.querySelector('.circle-checkbox');
        if (checkbox !== null && !checkbox.checked) {
            count++;
        }
    });

    console.log('Count of unclicked cross with unchecked checkboxes:', count);
    document.querySelector('span').textContent = count + ' ';
}

////////// drag && drop reorder function //////////
document.addEventListener('DOMContentLoaded', function () {
    const lists = document.getElementById('lists');

    lists.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    });

    lists.addEventListener('dragover', function (e) {
        e.preventDefault();
        const draggingElement = document.querySelector('.uls.dragging');
        const afterElement = getDragAfterElement(lists, e.clientY);
        
        if (afterElement == null) {
            lists.appendChild(draggingElement);
        } else {
            lists.insertBefore(draggingElement, afterElement);
        }
    });

    lists.addEventListener('dragend', function (e) {
        const draggingElement = document.querySelector('.uls.dragging');
        draggingElement.classList.remove('dragging');
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.uls:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});

////////// Creating list \\\\\\\\\\
function createListElement() {
    unorderedListdisplay = lists.querySelectorAll('uls');
    var div = document.createElement("div");
    div.id = 'ul' + Date.now();
    div.className = 'uls';
    div.draggable = true;
    createdClassnameList = lists.querySelectorAll('.uls');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'myCheckbox_' + Date.now();
    checkbox.name = 'myCheckbox';
    checkbox.className = 'circle-checkbox';

    var left = document.createElement("ul");
    left.className = 'left circle-checkbox-container';
    var li = document.createElement("li");
    var divs = document.createElement("div");
    var img = document.createElement('img');
    img.className = 'cross';
    img.id = 'img' + Date.now();

    li.appendChild(document.createTextNode(input.value));

    div.appendChild(checkbox);
    div.appendChild(left);
    left.appendChild(li);
    div.appendChild(divs);
    divs.appendChild(img);
    img.src = 'images/icon-cross.svg';

    lists.appendChild(div);

    img.style.display = 'none';

    div.addEventListener('mouseover', function() {
        img.style.display = 'block';
    });

    div.addEventListener('mouseout', function() {
        img.style.display = 'none';
    });

    input.value = "";


    checkbox.addEventListener('mouseover', function() {
        checkbox.style.borderColor = ''
    })

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.style.textDecoration = 'line-through';
        } else {
            li.style.textDecoration = 'none';
        }
    });

    updateTotalLists();
    updateCheckboxCount();
    

    div.addEventListener('dragstart', function (e) {
        setTimeout(()=> 
            div.classList.add('dragging'), 0);
    });

    div.addEventListener('dragend', function () {
        div.classList.remove('dragging');
    });

    var imgElement;
    imgElement = document.getElementById(img.id);
    console.log(imgElement)

    if(imgElement) {
        imgElement.addEventListener('click', function () {
            if(!imgElement.classList.contains('clicked')) {
                imgElement.classList.add('clicked');
                updateUnclickedCrossCount();
            }
            div.remove();
            updateTotalLists();
        });
    }  
}


////////// html Checked List \\\\\\\\\\
var existingCheckboxes = document.querySelectorAll("input[type='checkbox'].circle-checkbox");

existingCheckboxes.forEach(existingCheckbox => {
    existingCheckbox.addEventListener('change', function (e) {
        // Get the list item based on the checkbox ID
        var listItem = document.querySelector(`#check_${e.target.id.split('_')[1]}`);

        // Check if the checkbox is checked
        if (existingCheckbox.checked) {
            // Add 'clicked' class to the current targeted ID
            if (listItem) {
                listItem.classList.add('clicked');
            }
        } else {
            // If the checkbox is unchecked and it's the same checkbox that was previously checked,
            // remove 'clicked' class
            if (listItem && listItem.classList.contains('clicked')) {
                listItem.classList.remove('clicked');
            }
        }
    });
});

function handleBorderClick (event) {
    if(event.target.id === 'cross1') {
        // uls1.style.display = 'none';
        uls1.remove();
   } else if(event.target.id === 'cross2') {
        // uls2.style.display = 'none';
        uls2.remove();
    } else if (event.target.id === 'cross3') {
        // uls3.style.display = 'none';
        uls3.remove();
    } else if (event.target.id === 'cross4') {
        // uls4.style.display = 'none';
        uls4.remove();
    } else if (event.target.id === 'cross5') {
        // uls5.style.display = 'none';
        uls5.remove();
    } else if (event.target.id === 'cross6') {
        // uls6.style.display = 'none';
        uls6.remove();
    }
}
 document.getElementById('cross1').addEventListener('click', handleBorderClick);
 document.getElementById('cross2').addEventListener('click', handleBorderClick);
 document.getElementById('cross3').addEventListener('click', handleBorderClick);
 document.getElementById('cross4').addEventListener('click', handleBorderClick);
 document.getElementById('cross5').addEventListener('click', handleBorderClick);
 document.getElementById('cross6').addEventListener('click', handleBorderClick);

 ////////// Footer Clicks \\\\\\\\\\
document.addEventListener('DOMContentLoaded', function () {
    const allButton = document.querySelector('.all');
    const activeButton = document.querySelector('.active');
    const completedButton = document.querySelector('.completed');
    const clearCompletedButton = document.querySelector('.clear-completed');

    allButton.addEventListener('click', function () {
        allButton.classList.add('blue')
        activeButton.classList.remove('blue')
        completedButton.classList.remove('blue')
        // Display all div elements in the lists (html and javascript)
        const allDivs = document.querySelectorAll('.uls');
        allDivs.forEach(function (div) {
            div.style.display = 'flex';
        });
    });

    activeButton.addEventListener('click', function () {
        activeButton.classList.add('blue')
        allButton.classList.remove('blue')
        completedButton.classList.remove('blue')
        
        // Hide div elements with checked checkboxes (html and javascrpt)
        const allCheckboxes = document.querySelectorAll('.circle-checkbox:checked');
        allCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'none';
            }
        });

        // Display div elements with unchecked checkboxes
        const uncheckedCheckboxes = document.querySelectorAll('.circle-checkbox:not(:checked)');
        uncheckedCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'flex';
            }
        });
    });

    completedButton.addEventListener('click', function () {
        completedButton.classList.add('blue')
        allButton.classList.remove('blue')
        activeButton.classList.remove('blue')
        // Hide div elements with unchecked checkboxes (html and javascript)
        const allCheckboxes = document.querySelectorAll('.circle-checkbox:not(:checked)');
        allCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'none';
            }
        });

        // Display div elements with checked checkboxes
        const checkedCheckboxes = document.querySelectorAll('.circle-checkbox:checked');
        checkedCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'flex';
            }
        });
    });

    clearCompletedButton.addEventListener('click', function () {
        // Remove div elements with checked checkboxes (html and javascript)
        const allCheckboxes = document.querySelectorAll('.circle-checkbox:checked');
        allCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.remove();
            }
        });
    });
});

////////// Media Query (footer)\\\\\\\\\\
const mobileWidth = window.matchMedia('(max-width: 576px)');

function handleMediaChange(mobileWidth) {
    const footerCenter = document.querySelector('.center'); 
    const footerMobile = document.querySelector('.actives_mobile'); 
    
    if (mobileWidth.matches) { 
        footerCenter.style.display = 'none';
        footerMobile.style.display = 'flex';
    } else {
        footerCenter.style.display = 'flex';  
        footerMobile.style.display = 'none';
    }
}

handleMediaChange(mobileWidth)

mobileWidth.addEventListener('change', handleMediaChange);


document.addEventListener('DOMContentLoaded', function () {
    const allMobile = document.querySelector('.all_mobile');
    const activeMobile = document.querySelector('.active_mobile');
    const completedMobile = document.querySelector('.completed_mobile');

    allMobile.addEventListener('click', function () {
        allMobile.classList.add('blue')
        activeMobile.classList.remove('blue')
        completedMobile.classList.remove('blue')
        // Display all div elements in the lists (html and javascript)
        const allDivs = document.querySelectorAll('.uls');
        allDivs.forEach(function (div) {
            div.style.display = 'flex';
        });
    });

    activeMobile.addEventListener('click', function () {
        activeMobile.classList.add('blue')
        allMobile.classList.remove('blue')
        completedMobile.classList.remove('blue')
        
        // Hide div elements with checked checkboxes (html and javascrpt)
        const allCheckboxes = document.querySelectorAll('.circle-checkbox:checked');
        allCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'none';
            }
        });

        // Display div elements with unchecked checkboxes
        const uncheckedCheckboxes = document.querySelectorAll('.circle-checkbox:not(:checked)');
        uncheckedCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'flex';
            }
        });
    });

    completedMobile.addEventListener('click', function () {
        completedMobile.classList.add('blue')
        allMobile.classList.remove('blue')
        activeMobile.classList.remove('blue')
        // Hide div elements with unchecked checkboxes (html and javascript)
        const allCheckboxes = document.querySelectorAll('.circle-checkbox:not(:checked)');
        allCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'none';
            }
        });

        // Display div elements with checked checkboxes
        const checkedCheckboxes = document.querySelectorAll('.circle-checkbox:checked');
        checkedCheckboxes.forEach(function (checkbox) {
            const div = checkbox.closest('div');
            if (div) {
                div.style.display = 'flex';
            }
        });
    });
});