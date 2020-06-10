function Estados() {
    const stateSelect = document.querySelector('select')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res=> res.json()).then( states => {
        for( state of states ) {
            stateSelect.innerHTML += `<option value="${state.sigla}">${state.nome}</option>`
        }
    })
}
Estados()
var casosSpan = document.querySelector('span[id="cases"]')
var mortesSpan = document.querySelector('span[id="deaths"]')
var suspeitasSpan = document.querySelector('span[id="suspects"]')
var x = document.querySelectorAll('div[class="card"] h3')
var num = document.querySelectorAll('div[class="card"] span')
var format = {maximumFractionDigits: 7}


document.querySelector("select").addEventListener("change",  getUf)

function setLoading(loading = true){
    let fieldEl = document.querySelector('div[class="field"]')
    let loadingEl = document.createElement('strong')
    loadingEl.setAttribute('id','loading')    
    if (loading){
        loadingEl.appendChild(document.createTextNode("carregando..."))
        fieldEl.appendChild(loadingEl)
    } else {
        document.getElementById('loading').remove()
    }
}

function getUf(event) {
    casosSpan.innerHTML=''
    mortesSpan.innerHTML=''
    suspeitasSpan.innerHTML=''
    setLoading()
    const currentUF = event.target.value.toLowerCase();

    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${currentUF}`).then(res=> res.json()).then( state => {

    console.log(state); //API data

    console.log(document.createTextNode(state.cases.toLocaleString('pt-BR'), format));
    
    casosSpan.appendChild(document.createTextNode(state.cases.toLocaleString('pt-BR'), format))

    mortesSpan.appendChild(document.createTextNode(state.deaths.toLocaleString('pt-BR'), format))

    suspeitasSpan.appendChild(document.createTextNode(state.suspects.toLocaleString('pt-BR'), format))
    for(i in x){
        num[i].hidden = false        
        x[i].hidden = false
        i++
    }
    setLoading(false)
    })
}