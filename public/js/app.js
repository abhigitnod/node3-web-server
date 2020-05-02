console.log("Hey Page has been loaded successfully. And This message is supposed to be displayed on the brousers console and not in node's console");



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = 'Temperature: '+String(data.temperature) +' ,Pressure: ' +String(data.pressure) +' ,Humidity: '+ String(data.humidity);
        }
    })
    })
    
})