
const MALE_NAMES = ['Kwasi','Kwadwo','Kwabena','Kwaku','Yaw','Kofi','Kwame'];
const FEMALE_NAMES =['Akosua','Adwoa','Abenaa','Akua', 'Yaa', 'Afua', 'Ama'];
const DAYS_OF_WEEK= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']


function validate(value) {
  var element = document.getElementById('txtResult');
  element.innerText=value;
  element.className= 'btn btn-danger';
  
}


function getDateOfBirthAndCalculateDayOfTheWeek() {
    var element = document.getElementById('txtResult');
    element.className= 'btn btn-default';
    element.innerHTML='..........................';
    var inputs = prompt("Please enter the date of birth in format : YYYY-MM-DD");

    let result = -1;
    if (inputs != null) {
        var dateInputs = inputs.split('-');
        if (dateInputs.length !== 3) { // valid the DoB value. make sure it has three values in the array
            validate("The date is invalid");
            return -1;
        }

        var yearValue = dateInputs[0];
        if (yearValue.length < 4) {
            validate("The year is invalid");
            return -1;
        }

       var currentYear = parseInt(dateInputs[0]);
        try {
            var century = parseInt(yearValue.substring(0, 2));
            
            yearValue = parseInt(yearValue.substring(2));
            const validYear =  new Date().getFullYear();
            console.log(`${validYear}, ${currentYear}`) ;

            if (currentYear > validYear) {
                validate(`The year is should not be more than ${validYear}`);
                return -1;
            }

            var monthValue = parseInt(dateInputs[1]) ;
            var dayValue = parseInt(dateInputs[2]);
            result[0] = century;
            result[1] = parseInt(yearValue);
            result[2] = monthValue;
            result[3] = dayValue;



           if (dayValue <= 0 || dayValue > 31) {
            validate("Day should be between 1 -31");
            return null;
           }

           if (monthValue <= 0 || monthValue > 12) {
            validate("month should be between 1 -12");
            return null;
           }

            var dayOfWeek =  (((century/4) -2*century-1) + ((5*yearValue/4)) + ((26*(monthValue+1)/10)) + dayValue) % 7;
            console.log(dayOfWeek)
            var finalResult = Math.floor(dayOfWeek);
            console.log(finalResult)
            result = finalResult;
            element.innerText=inputs;
            element.className='btn btn-success';
        } catch (error) {
            validate(error);
        }
      
    } else {
        validate("The date provided is invalid");
    }
    return result;
}

function getGender() {
    var userInput = prompt("Please enter the gender");
    if (userInput == null || userInput.length === 0) {
        validate("invalid gender, you did not give your input");
        return "";
    }

  return userInput;
}

function getChildName() {
    var dayOfWeek = getDateOfBirthAndCalculateDayOfTheWeek();
    var gender = getGender().toLowerCase();
    var element = document.getElementById('txtResult');
    let result = "";
 
   
    if (dayOfWeek != null && dayOfWeek != -1) {
        let dayIndex = parseInt(dayOfWeek);
        switch(gender) {
            case 'male':
                result = MALE_NAMES[dayIndex];
                break;
            case 'female':
                result= FEMALE_NAMES[dayIndex];
                break;
            default:
                result= "Not applicable";
      
        }
    }
    element.className= 'btn btn-success';
    element.innerText= `Your child's name is : ${result}`;
}



