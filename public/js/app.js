console.log('JS loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherResult = document.getElementById('weatherResult')
console.log(weatherResult.innerText)

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(search.value)
    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if(!data.error){
                weatherResult.innerText= 'Address : '+data.address+'\n'+'Weather: '+data.weather
                console.log('Address : '+data.address)
                console.log('Weather: '+data.weather)
            }
            else{
                weatherResult.innerText='Error: '+data.error
                console.log('Error: '+data.error)
            }
        })
    })
})