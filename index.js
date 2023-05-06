let form = document.getElementsByTagName('form')[0];
let today = new Date();



form.addEventListener('submit', function(e){
    
    e.preventDefault();
    console.log

    let bornDay = document.getElementById('bornDate');
    let bornMonth = document.getElementById('bornMonth');
    let bornYear = document.getElementById('bornYear');

    if (!validate(bornDay, bornMonth, bornYear)){
        years.textContent = "--";
        months.textContent = "--";
        days.textContent = "--";
        return false;
    }

    bornDay = parseInt(bornDay.value);
    bornMonth = parseInt(bornMonth.value);
    bornYear = parseInt(bornYear.value);


    let born = new Date(bornYear, bornMonth - 1, bornDay);

    let diffYears = today.getFullYear() - born.getFullYear();
    let diffMonths = today.getMonth() - born.getMonth();
    let diffDays = today.getDate() - born.getDate();


    if ( diffMonths < 0  || (diffDays < 0 && diffMonths === 0)) {
        diffMonths+=12
        diffYears--;
    }

    if ( diffDays < 0) {
        diffDays += (new Date(today.getFullYear(), today.getMonth(), 0).getDate());
        diffMonths--;
    }

    years.textContent = diffYears;
    months.textContent = diffMonths;
    days.textContent = diffDays;
});


function validate(bornDay, bornMonth, bornYear){
    let flag = true;
    // console.log(typeof(bornDay), bornDay);
    if (bornDay.value === "") {
        setValuesToElements(0, "This field is Required", "hsl(0, 100%, 67%)", "hsl(0, 100%, 67%)");
        flag = false;
    } else if (parseInt(bornDay.value) != bornDay.value ||  ( 1 > parseInt(bornDay.value) || parseInt(bornDay.value) > 31 ) ) {
        setValuesToElements(0, "Must be a valid day","hsl(0, 100%, 67%)", "hsl(0, 100%, 67%)");
        flag = false;
    } else {
        setValuesToElements(0, "", "hsl(0, 1%, 44%)", "hsl(0, 0%, 86%)");
    }
    
    if (bornMonth.value === "") {
        setValuesToElements(1, "This field is Required", "hsl(0, 100%, 67%)", "hsl(0, 100%, 67%)");
        flag = false;
    } else if (parseInt(bornMonth.value) !=  bornMonth.value ||  ( 1 > parseInt(bornMonth.value) || parseInt(bornMonth.value) > 12 )) {
        setValuesToElements(1, "Must be a valid month", "hsl(0, 100%, 67%)", "hsl(0, 100%, 67%)");
        flag = false;
    } else {
        setValuesToElements(1, "", "hsl(0, 1%, 44%)", "hsl(0, 0%, 86%)");
    }
    
    if (bornYear.value === "") {
        setValuesToElements(2, "This field is Required", "hsl(0, 100%, 67%)", "hsl(0, 100%, 67%)");
        flag = false;
    } else if (parseInt(bornYear.value) != bornYear.value || parseInt(bornYear.value) > new Date().getFullYear()) {
        setValuesToElements(2,"Must be a valid year","hsl(0, 100%, 67%)","hsl(0, 100%, 67%)");
        flag = false;
    } else {
        setValuesToElements(2, "", "hsl(0, 1%, 44%)", "hsl(0, 0%, 86%)");
    }

    if (flag) {
        if (parseInt(bornDay.value) > new Date(bornYear.value, bornMonth.value, 0).getDate() ) {
            setValuesToElements(0, "Must be a valid day", "hsl(0, 100%, 67%)", "hsl(0, 100%, 67%)");
            flag = false;
        }
    }

    return flag;
}

function setValuesToElements(orderNoInt, MessageStr, colorStr, borderColorStr){
    document.getElementsByTagName("small")[orderNoInt].textContent = MessageStr;
    document.getElementsByTagName("label")[orderNoInt].style.color = colorStr;
    document.getElementsByTagName("input")[orderNoInt].style.borderColor = borderColorStr;
}
