


const planetsContainer = document.getElementById('planets-ctn');
const peopleContainer = document.getElementById('people-ctn');
const filmsContainer = document.getElementById('films-ctn');


async function fetchData(url, endpoint, containerElement){
    try{
        const response = await fetch(url);
    const data = await response.json()
    // console.log(data)
    const resource = data.results
    
    output = ' ';

    resource.forEach(item =>{
       
        output += `<div ${endpoint}-card card data-type="${endpoint}" data-id="${item.url.split('/').filter(Boolean).pop()}">
                    ${endpoint ===  "people" ?
                        `<p>${item.name}</p>
                         <p>${item.birth_year}</p>` :
                    endpoint === "planets" ?
                        `<p>${item.name}</p>
                        <p>${item.diameter}</p>` : 
                    endpoint === "films" ?
                        `<p>${item.producer}</p>
                        <p>${item.release_date}</p>`:' '}
                </div>`
    })
    containerElement.innerHTML = output;

    }catch (error){
        console.error('Error fetching data',error)
    }
     
}
// Display all resources at once
async function fetchAndUpdate(){
    try{
        const url = "https://swapi.dev/api/planets/"
        await fetchData(url, "planets", planetsContainer)
        await fetchData(url.replace("planets", "people"), "people", peopleContainer);
        await fetchData(url.replace("planets", "films"), "films", filmsContainer)
    }catch(error){
        console.error('Error fetching data', error)
    }
}
fetchAndUpdate()
// Display each resource and hide the rest using toogle on the button
const tabs = document.querySelectorAll("nav .tab-btn")
const sections = document.querySelectorAll('.section')

tabs.forEach((tab, index) =>{
    tab.addEventListener('click', ()=>{
        tabs.forEach(tab =>{tab.classList.remove('active')})
        tab.classList.add('active')
        sections.forEach(section =>{section.classList.remove('active')})
        sections[index].classList.add('active')
    })
})

// fetching data for the modal 
async function modalResource(endpoint, endpoint_id){
    try{
        const response = await fetch(`https://swapi.dev/api/${endpoint}/${endpoint_id}`);
        const data = await response.json()
        console.log(data)
        displaymodal(data);
    }catch(error){
        console.error('Error fetching data', error)
    }
}

document.addEventListener('click', event => {
    const card = event.target.closest('.card')
    if (card && card.hasAttribute('data-type') && card.hasAttribute('data-id')){
        const endpoint = card.getAttribute('data-type')
        const endpoint_Id = card.getAttribute('data-id')
        modalResource(endpoint, endpoint_Id)
    }
})



function displaymodal(data){
    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = ' ';
    if (data.name){
        if (data.climate){
            modalContent.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.diameter}</p>
            `
        }else {
            modalContent.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.birth_year}</p>
            `
        }
    }else if (data.title) {
        modalContent.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.producer}</p>
        `
    }
    const modalDisplay = document.getElementById('modal-section')
    modalDisplay.style.display = 'block'
}

