const billInp = document.getElementById('bill-inp');
const tipCustom = document.getElementById('tip-inp');
const pplInp = document.getElementById('ppl-inp');
const tipBtns = document.querySelectorAll('.tip');
const errorMsg = document.querySelector('.error-msg');
const price = document.querySelectorAll('.price');
const resetBtn = document.querySelector('.reset');

resetBtn.addEventListener('click', reset);
billInp.addEventListener('input', setBillValue);
tipCustom.addEventListener('input', setCustomTipValue);
pplInp.addEventListener('input', numOfPpl);



let billValue = 0.0;
let tipValue = .15;
let party = 0;


const validateFloat = s => {
    let xd = /^[0-9]*\.?[0-9]*$/;
    return s.match(xd);
}

const validateInt = s => {
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}



function setBillValue() {
    if(billInp.value.includes(',')) {
        billInp.value = billInp.value.replace(',', '.');
    }

    if(!validateFloat(billInp.value)) {
        billInp.value = billInp.value.substring(0, billInp.value.length - 1);
    }

    billValue = parseFloat(billInp.value);
    calcPayments();
}

for (let i=0; i<tipBtns.length; i++) {
    tipBtns[i].addEventListener('click', function() {
        if(tipBtns[i].classList.contains('active')) {
            tipBtns[i].classList.remove('active');
            tipValue = 0.0;
            tipCustom.value = '';
            calcPayments();

        }
        else {
            for (let j=0; j<tipBtns.length; j++) {
                tipBtns[j].classList.remove('active');
            }
            tipBtns[i].classList.add('active');
            tipCustom.value = '';
            tipValue = parseFloat(tipBtns[i].innerHTML)/100;
            calcPayments();
        }
    })
}

function numOfPpl() {
    if(!validateInt(pplInp.value)) {
        pplInp.value = pplInp.value.substring(0, pplInp.value.length-1);
    }

    if(pplInp.value != '' || pplInp.value !== 0) {
        errorMsg.classList.add('disabled');
    }

    if(pplInp.value == '' || pplInp.value == 0) {
        errorMsg.classList.remove('disabled');
    }
    party = parseFloat(pplInp.value);
    calcPayments();
}


function setCustomTipValue(){
    if(!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    for (let j=0; j<tipBtns.length; j++) {
        tipBtns[j].classList.remove('active');
    }
    console.log(tipValue);
    

    tipValue = parseFloat(tipCustom.value)/100;
    calcPayments();
}

function calcPayments() {
    if(party >= 1) {
        let tipAmount = billValue * tipValue / party;
        let total = billValue / party + tipAmount;

        price[0].innerHTML = '$' + tipAmount.toFixed(2);
        price[1].innerHTML = '$' + total.toFixed(2);

    }
}

function reset() {
    billInp.value = '';
    tipBtns[2].click();
    pplInp.value = '';

    billValue = '';
    party = '';

    price[0].innerHTML = '$0.00';
    price[1].innerHTML = '$0.00';

}
