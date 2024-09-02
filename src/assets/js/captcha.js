exports.callJSFun = function () {

    let captchaText = document.querySelector('#captcha');
    let userText = document.querySelector('#textBox');
    let submitButton = document.querySelector('#submit');
    let output = document.querySelector('#output');
    let refreshButton = document.querySelector('#refresh');

    let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let emptyArr = [];
    for (let i = 1; i <= 6; i++) {
        emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    captchaText.innerHTML = emptyArr.join('');

    submitButton.addEventListener('click', function () {
        if (userText.value === captchaText.innerHTML) {
            output.classList.add("greenText");
            output.innerHTML = "Correct!";
        }

        else if(userText.value === ""){
            output.classList.add("redText");
            output.innerHTML="Please Enter CAPTCHA";
        }

        else if(userText.value !== captchaText.innerHTML) {
            output.classList.add("redText");
            output.innerHTML = "Incorrect captcha, Please Try again";
            //Added By kavitha 07/10/2023 When Captcha is incorrect then Username and Password should reset
            document.querySelector('#yourUsername').value = "";
            document.querySelector('#yourPassword').value = "";
            document.querySelector('#textBox').value = "";
        }
    });

    refreshButton.addEventListener('click', function () {
        userText.value = "";
        let refreshArr = [];
        for (let j = 1; j <= 6; j++) {
            refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        }
        captchaText.innerHTML = refreshArr.join('');
    });

    exports.sendThis = function(){
        if (userText.value === captchaText.innerHTML) {
            // output.classList.add("greenText");
            output.innerHTML = "Correct!";
            return 1;

        } else {
            return 0;
        }
    }
}

