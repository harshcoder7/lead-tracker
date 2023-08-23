//brave://extensions/

//**working with local storage */
/* let leads = `["www.awesomelead.com"]`
// 1. Turn the myLeads string into an array
leads=JSON.parse(leads)
// 2. Push a new value to the array
leads.push("harami")
// 3. Turn the array into a string again
leads=JSON.stringify(leads)  

// 4. Console.log the string using typeof to verify that it's a string
console.log(typeof leads) */
let leads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");

const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));

if (leadsFromLocalStorage) {
    leads = leadsFromLocalStorage
    render(leads)
}
  

tabBtn.addEventListener("click", function(){
  //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //})

    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      
   // Grab the URL of the current tab!
      leads.push(tabs[0].url)
      localStorage.setItem("leads", JSON.stringify(leads) )
      render(leads)

    })

})

function render(yolo) {
  let listitems = "";
  for (let i = 0; i < yolo.length; i++) {
    //this is a complex way to store the links
    // listitems+="<li><a target='_blank'  href=' "+ leads[i]+ "'>"+ leads[i]+"</a></li>"
    //we can use template strings to simplify these back ticks is the solution
    // ($) is used as part of a JavaScript feature called "template literals."
    listitems += `
        <li>
            <a target='_blank' href='${yolo[i]}'>   
                ${yolo[i]}
            </a>
        </li>
    `;
  }
  ulEl.innerHTML = listitems;
}

//we use to concept of setitem() and getitem() to give key vlaue pair in local storage
// 1. Save a key-value pair in localStorage
/* let harsh=localStorage.setItem("harsh","randu")
// 2. Refresh the page. Get the value and log it to the console
console.log(localStorage.getItem("harsh"))
// 3. Clear localStorage

localStorage.clear()
 */

deleteBtn.addEventListener("dblclick", function () {
  // Your code to handle the double click event
  // Clear localStorage
  localStorage.clear();

  // Clear myLeads array
  leads = [];

  // Clear content from the DOM
  render(leads);
});
inputBtn.addEventListener("click", function () {
  // Push the value from the inputEl into the myLeads array
  // instead of the hard-coded "www.awesomeleads.com" value
  // Google -> "get value from input field javascript"
  leads.push(inputEl.value);
  inputEl.value = "";

  // Save the myLeads array to localStorage
  // PS: remember JSON.stringify()

  localStorage.setItem("leads", JSON.stringify(leads));
  render(leads);
});


