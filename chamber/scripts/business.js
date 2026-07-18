const requestURL = 'https://anuchaj.github.io/wdd230/chamber/data/companies.json';
//const requestURL = "../data/companies.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const business = jsonObject['companies'];
   
    business.forEach(displayCard);
  });


function displayCard(biz) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let businessName = document.createElement('p');
    let address = document.createElement('p');
    let phoneNum = document.createElement('p');
    let website = document.createElement('a');
    let portrait = document.createElement('img');
  
    // Change the textContent property of the h2 element to contain the biz's full name
    businessName.textContent = biz.name;
    address.textContent = biz.address;
    phoneNum.textContent = biz.phone;
    website.textContent = biz.website;

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    portrait.setAttribute('src', biz.imageurl);
    portrait.setAttribute('alt', 'Logo of ' + biz.name);
    portrait.setAttribute('loading', 'lazy');
  
    // Add/append the section(card) with the businessName element
    card.appendChild(portrait);
    card.appendChild(businessName);
    card.appendChild(address);
    card.appendChild(phoneNum);
    card.appendChild(website);
    
  
    // Add/append the existing HTML div with the cards class with the section(card)
    document.querySelector('#cards').appendChild(card);
  }


function gridView() {
  document.getElementById('grid').classList.add("open");
  document.getElementById('cards').classList.remove("open");
}

function listView() {
  document.getElementById('cards').classList.add("open");
  document.getElementById('grid').classList.remove("open");
}

const lv = document.getElementById('list');
lv.onclick = listView;

const c = document.getElementById('grid');
c.onclick = gridView;