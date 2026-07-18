const requestURL = 'https://anuchaj.github.io/wdd230/chamber/data/companies.json';
//const requestURL = "../data/companies.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const business = jsonObject['companies'];

    let randomMembers = []; // array to store selected members
    let member = "";
    let count = 0; // to keep track of the number of members needed
    while (count < 3) {
      member = business[Math.floor(Math.random() * business.length)]; // bring the lenght of members to absolute
      if (member.membership == "Gold" || member.membership == "Silver" ){ // checks membership status
        if (!randomMembers.includes(member)) { // 'includes' is used to check to see if member doesn't already exist in the list.
          randomMembers.push(member); // adds member to the selected list
          count++;
        }
      }
    }
    //console.log(randomMembers);
    randomMembers.forEach(displayCard);
    //business.forEach(displayCard); 
  });


//let count = 0;

function displayCard(biz) {
    //if (count <= 3) { // Check count status

    //Check if condition is true
    //if (biz.membership == "Gold" || biz.membership == "Silver") {
        
    // Create elements to add to the document
    let card = document.createElement('section');
    card.setAttribute("class", "spots");
    let businessName = document.createElement('p');
    let address = document.createElement('p');
    let phoneNum = document.createElement('p');
    let website = document.createElement('a');
    let portrait = document.createElement('img');
    let membership = document.createElement('p');
    let hr = document.createElement('hr')

    // Change the textContent property of the elements to contain the biz's details
    membership.textContent = biz.membership;
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
    card.appendChild(membership);
    card.appendChild(website);
    card.appendChild(hr);

    // Add/append the existing HTML div with the spotlight class with the section(card)
    document.querySelector('.spotlight').appendChild(card);
    //}
        //count += 1;
    //}
}
