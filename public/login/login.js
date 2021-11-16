const baseURL = 'http://localhost:8080';
document.querySelector('#submit').addEventListener('click', submitClicked);

async function submitClicked(){
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if(!(email && password))
        return displayResult('Please fill all the fields');
    
    displayResult('Logging in...');
    try{
        const response = await axios.post(`${baseURL}/login`, {
            email, password
        })
        if(response.data === 'success')
            window.location.href = baseURL;
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
