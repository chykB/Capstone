const planetsCtn = document.getElementById("planets-ctn")
const peopleCtn = document.getElementById("people-ctn")
const filmsCtn = document.getElementById("films-ctn")
const url = "https://swapi.dev/api/planets/"

async function fetchData(url, endpoint, containerElement){
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    const resource = data.results
   

    output = ' '
    resource.forEach(item =>{
        output += `<div class="${endpoint}-card card" data-type="${endpoint}" data-id="${item.url.split("/").filter(Boolean).pop()}">
                    ${endpoint === "planets" ? 
                    `<h2>${item.name}</h2>
                    <p>${item.climate}</p>`:
                    endpoint === "people"?
                    `<h2>${item.name}</h2>
                    <p>${item.birth_year}</p>`:
                    endpoint === "films" ?
                    `<h2>${item.title}</h2>
                    <p>${item.producer}</p>` : ''}
                </div>`
    })
    containerElement.innerHTML = output
}
// fetchData("https://swapi.dev/api/people/", "people", peopleCtn)

// Display Data in different section
async function fetchAndUpdate(){
    const url = "https://swapi.dev/api/planets/"
    await fetchData(url, "planets", planetsCtn)
    await fetchData(url.replace("planets","people"), "people", peopleCtn)
    await fetchData(url.replace("planets", "films"), "films", filmsCtn)
}
fetchAndUpdate()

// Toggle between the resources
const tabs = document.querySelectorAll("nav .tab-btn")
const sections = document.querySelectorAll("section")

tabs.forEach((tab, index) =>{
    tab.addEventListener("click", ()=>{
        tabs.forEach(tab =>{tab.classList.remove("active")})
        tab.classList.add("active")
        sections.forEach(section =>{section.classList.remove("active")})
        sections[index].classList.add("active")
    })
})


// Getting and display modal
async function fetchModalResource(endpoint, resourceId){
    const response = await fetch(`https://swapi.dev/api/${endpoint}/${resourceId}`)
    const data = await response.json()
    // console.log(data)
    displayModalContent(data)
}
// fetchModalResource("planets", 3)

document.addEventListener("click", event =>{
    const card = event.target.closest(".card")
    if (card && card.hasAttribute("data-type") && card.hasAttribute("data-id")){
        const endpoint = card.getAttribute("data-type")
        const resourceId = card.getAttribute("data-id")
        fetchModalResource(endpoint, resourceId)
    }
})

function displayModalContent(data){
    const modalContent = document.querySelector(".modal-content")
    modalContent.innerHTML = " "
    if (data.climate){
        modalContent.innerHTML = `
        <h2>${data.name}</h2>
        <h3>Climate:  <span>${data.climate}</span></h3>
        <h3>Population: <span>${data.population}</span></h3>
        <h3>Diameter: <span>${data.diameter}</span></h3>
        <h3>Orbital Period: <span>${data.orbital_period}</span></h3>
        <h3>Rotation Period: <span>${data.rotation_period}</span></h3>
        <h3>Terrain: <span>${data.terrain}</span></h3>
        <h3>Surface Water: <span>${data.surface_water}</span></h3>
        `
    }else if (data.name){
        modalContent.innerHTML = `
        <h2>${data.name}</h2>
        <h3>Gender: <span>${data.gender}</span></h3>
        <h3>Birth Year: <span>${data.birth_year}</span></h3>
        <h3>Height: <span>${data.height}</span></3>
        <h3>Eye Color: <span>${data.eye_color}</span></h3>
        <h3>Hair Color: <span>${data.hair_color}</span></h3>
        <h3>Skin Color: <span>${data.skin_color}</span></h3>
        <h3>Created: <span>${data.created}</span></h3>
        `
    }else if (data.title){
        modalContent.innerHTML = `
        <h2>${data.title}</h2>
        <h3>Director: <span>${data.director}</span></h3>
        <h3>Producer: <span>${data.producer}</span></h3>
        <h3>Release Date: <span>${data.release_date}</span></h3>
        <h3>Episode: <span>${data.episode_id}</span></h3>
        <h3>Description: <span>${data.opening_crawl}</span></h3>
        `
    }
    const modalSection = document.getElementById("modal-section")
    modalSection.style.display = "block"

        
}

// close the modal
const closeModal = document.querySelector(".close")
    closeModal.addEventListener("click", ()=>{
        const modalSection = document.getElementById("modal-section")
        modalSection.style.display = "none"
    })


window.addEventListener("click", event =>{
    const modal = document.getElementById("modal-section")
    if (event.target == modal){
        modal.style.display = "none"
    }
} )