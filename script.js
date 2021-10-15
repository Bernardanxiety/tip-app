const billInp = document.getElementById('billInp');
const tipBtns = document.querySelectorAll('.tip');
const custom = document.getElementById('custom');
const partyInp = document.getElementById('partyInp');
const price = document.querySelectorAll('.price');
const resetBtn = document.querySelector('.reset');

billInp.addEventListener('input', setBillValue);
custom.addEventListener('input', setCustomTip);
partyInp.addEventListener('input', setParty);
resetBtn.addEventListener('click', reset);

for (let i=0; i<tipBtns.length; i++) {
    tipBtns[i].addEventListener('click', function() {
        if(tipBtns[i].classList.contains('active')) {
            tipBtns[i].classList.remove('active');
            tip = 0;
        }
        else {
            for (let j=0; j<tipBtns.length; j++) {
                tipBtns[j].classList.remove('active');
            }
            tipBtns[i].classList.add('active');
            tip = tipBtns[i].innerHTML;
            tip = parseFloat(tip)/100;
        }
        custom.value = '';
        calcPayments();
    });
}


let bill = '';
let tip = .15;
let party = 0;


function validate(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/
    return s.match(rgx);
}

function validateCustom(s) {
    var rgx = /^[0-9]*$/
    return s.match(rgx);
}

function setBillValue() {
    if(billInp.value.includes(',')) {
        billInp.value = billInp.value.replace(',', '.');
    }

    if(!validate(billInp.value)) {
        billInp.value = billInp.value.substring(0, billInp.value.length - 1);
    }

    
    bill = parseFloat(billInp.value*100/100);

    
    calcPayments();
}

function setCustomTip() {
    for (let i=0; i<tipBtns.length; i++) {
        tipBtns[i].classList.remove('active');
    }

    if(!validateCustom(custom.value)) {
        custom.value = custom.value.substring(0, custom.value.length - 1);
    }
    tip = parseFloat(custom.value/100);
    calcPayments();
}

function setParty() {
    if(!validateCustom(partyInp.value)) {
        partyInp.value = partyInp.value.substring(0, partyInp.value.length - 1);
    }
    party = parseFloat(partyInp.value/100*100);
    calcPayments();
}

function calcPayments() {
    if(party >= 1) {
        let tipValue = bill / party * tip;
        let totalValue = bill / party + tipValue;
    
        price[0].innerHTML = '$' + tipValue.toFixed(2);
        price[1].innerHTML = '$' + totalValue.toFixed(2);
    }
    
}

function reset() {
    billInp.value = '';
    setBillValue();
    partyInp.value = '';
    setParty();
    calcPayments();
    tipBtns[2].click();
}
