
document.querySelector('.convert').addEventListener('mousedown', removeFocus);
document.querySelector('.convert').addEventListener('click', convert);
document.querySelector('#dropDownVolume').addEventListener('click', toggleVolume);
window.addEventListener('click', mouseOutDropdown);
document.querySelector('.slider').addEventListener('input', displayValue);


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
    let volumeForPours = document.querySelectorAll('#volumeForPours');
    volumeForPours.forEach(volumeForPour => volumeForPour.innerText = volume)
};


//function call to convert the amount in the input field along with a nested function to alert if amount is invalid (NaN)
function convert(){
    const alertPlaceholder = document.querySelector('#liveAlertPlaceholder');
    const numRegex = new RegExp('^[0-9]+$');
    let amount = document.getElementById('beans').value;

    function showAlert(message) {
        let wrapper = document.createElement('div');
        wrapper.innerHTML = '<div id="liveAlertPlaceholder" class="alert alert-danger alert-dismissible collapse" role="alert"><div class="alertCopy">'+ message +'</div><button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close"></button></div>';
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
        showAlert('Please enter a valid number.');
    }
    else {
        document.getElementById('currentAmount').innerText = amount;
        document.querySelector('#bloomConversion').innerText = amount * 2;
        let allConversionAmounts = document.querySelectorAll('#conversion');
        allConversionAmounts.forEach(conversionAmount => conversionAmount.innerText = amount * Math.abs(selectedCoffeeStrength))
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

checkBoxes.forEach(cb => cb.addEventListener('change', strikeThroughText));

function strikeThroughText(event) {
    let cb = event.target;
    let isChecked = cb.checked;
    cb.nextElementSibling.classList.toggle('strikethrough', isChecked);
}

//function call to hide the dropdown menu if user clicks outside of it
function mouseOutDropdown(e) {
    let clickDropdown = e.target;
    if (!document.querySelector('#dropDownVolume').contains(clickDropdown)) {
        document.querySelector('.input-group-append').classList.remove('show');
        document.querySelector('.dropdown-menu').classList.remove('show');
    }
}


let selectedCoffeeStrength = -4;
//function call to display the slider value in the below p tag
function displayValue(e) {
    let selectedValue = Math.abs(e.target.value);
    console.log(selectedValue);
    let coffeePreferences = ['Extra Strong', 'Strong', 'Medium', 'Light','Extra Light'];
    let slider = document.querySelector('.slider');
    document.querySelector('.coffeeStrength').innerText = coffeePreferences[selectedValue-2];

    selectedCoffeeStrength = selectedValue;

    let percentage = (selectedValue - Math.abs(slider.min)) / (Math.abs(slider.max) - Math.abs(slider.min)) * 100;
    slider.style.backgroundImage = `linear-gradient(90deg, #863426 ${percentage}%, transparent ${percentage}%)`;
};