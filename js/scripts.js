
document.querySelector('.convert').addEventListener('mousedown', removeFocus);
document.querySelector('.convert').addEventListener('click', convert);
document.querySelector('#dropDownVolume').addEventListener('click', toggleVolume);
window.addEventListener('click', mouseOutDropdown);


//function call to remove the outline of the Convert button when clicked
function removeFocus(e) {
    e.preventDefault();
};


//function call for updating the volume name in the dropdown menu
let volumes = document.querySelectorAll('.dropdown-menu a');

volumes.forEach(volume => volume.addEventListener('click', updateVolume));

function updateVolume(e) {
    let volume = e.target.innerText;
    document.querySelector('#dropDownVolume').innerText = volume;
    document.querySelector('.input-group-append').classList.toggle('show');
    document.querySelector('.dropdown-menu').classList.toggle('show');
};


//function call to convert the amount in the input field along with a nested function to alert if amount is invalid (NaN)
function convert(){
    const alertPlaceholder = document.querySelector('#liveAlertPlaceholder');
    const numRegex = new RegExp('^[0-9]+$');
    let amount = document.getElementById('beans').value;

    function showAlert() {
        let wrapper = document.createElement('div');
        wrapper.innerHTML = '<div id="liveAlertPlaceholder" class="alert alert-danger alert-dismissible collapse" role="alert"><div class="alertCopy">Please enter a valid number.</div>' + '<button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        alertPlaceholder.append(wrapper);
        let errorAlert = document.querySelector('.alert');

        errorAlert.classList.remove('collapse');

        setTimeout(function () {
            errorAlert.classList.add('collapse');
        }, 3000);

        setTimeout(function () {
            if (alertPlaceholder.children) {
                alertPlaceholder.removeChild(alertPlaceholder.firstChild);
            }
        }, 4000);
    };
    
    if (!numRegex.test(amount)) {
        showAlert();
    }
    else {
        document.getElementById('currentNum').innerText = amount;
        document.getElementById('conversion').innerText = amount * 2;
    }
};


//function call to toggle the Volume dropdown and set aria-expanded true/false
function toggleVolume() {
    document.querySelector('.input-group-append').classList.toggle('show');
    document.querySelector('.dropdown-menu').classList.toggle('show');
    // console.log('logging before the if statement: ', document.querySelector('#dropDownVolume').getAttribute('aria-expanded'));
    let isAriaExpanded = document.querySelector('#dropDownVolume').getAttribute('aria-expanded');
    if (isAriaExpanded === 'true') {
        isAriaExpanded = 'false';
    }
    else {
        isAriaExpanded = 'true'
    };
    document.querySelector('#dropDownVolume').setAttribute('aria-expanded', isAriaExpanded);
};


//the below func takes in the event(action), able to target it as a checkbox action by checked, and then uses that to toggle strikethrough based on if cb.checked is t/f

//the below checkBoxes obj applies a addEventListener function on each checkbox. the function listens for the 'change' event, and if 'change' is done, then strikeThroughText func (the above func) is called for each checkbox 
let checkBoxes = document.querySelectorAll('.form-check-input');

checkBoxes.forEach( cb => cb.addEventListener('change', strikeThroughText));

function strikeThroughText(event) {
    let cb = event.target;
    console.log('this is the event: ', event);
    console.log('this is the target: ', event.target);
    let isChecked = cb.checked;
    cb.nextSibling.classList.toggle('strikethrough', isChecked);
}

//function call to hide the dropdown menu if user clicks outside of it
function mouseOutDropdown(e) {
    let clickDropdown = e.target;
    if (!document.querySelector('#dropDownVolume').contains(clickDropdown)) {
        document.querySelector('.input-group-append').classList.remove('show');
        document.querySelector('.dropdown-menu').classList.remove('show');
    }
}
