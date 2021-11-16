const baseURL = 'http://localhost:8080';
document.querySelector('#submit').addEventListener('click', submitClicked);

function submitClicked(){
    if(!checkGoodData()) return;
}

async function checkGoodData(){
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const password2 = document.querySelector('#password2').value;

    if(!(username && email && password && password2))
        return displayResult('Please fill all the fields');
    if(password !== password2) 
        return displayResult('Passwords must match');
    
    displayResult('Registering...');
    try{
        const response = await axios.post(`${baseURL}/register`, {
            username, email, password
        })
    }
    catch(error){
        displayResult(error.response.data.error);
    }
}

function displayResult(message){
    const resultField = document.querySelector('#result');
    resultField.innerText = message;
    setTimeout(() => {
        resultField.innerText = '';
    }, 3000);
}
