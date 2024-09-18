let myLeads = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.querySelector("#tab-btn")

if (leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  renderList(myLeads)
}

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderList(myLeads)
  })
})

function renderList(leads){
	let listItems = ""
	for (let i=0; i<leads.length;i++){
  	listItems += `
    <li>
    	<a target='_blank' href='${leads[i]}'>
      	${leads[i]}
      </a>
     </li>
     `
  }
  ulEl.innerHTML = listItems
}


inputBtn.addEventListener("click", function () {
	myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  renderList(myLeads)
})

deleteBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  myLeads = []
  renderList(myLeads)
})