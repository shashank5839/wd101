const form = document.querySelector('#registration-form');
const table = document.querySelector('#user-table tbody');

let loadUserData = () => {
  table.innerHTML = '';

  if (localStorage.getItem('users')) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.forEach(user => {
      const row = table.insertRow();
      const cell = newRow.insertCell();
      const emailCell = newRow.insertCell();
      const passwordCell = newRow.insertCell();
      const dobCell = newRow.insertCell();
      const acceptedTermsCell = newRow.insertCell();

      cell.innerText = user.name;
      emailCell.innerText = user.email;
      passwordCell.innerText = user.password;
      dobCell.innerText = new Date(user.dob).toISOString().slice(0,10);
      acceptedTermsCell.innerText = user.acceptedTerms ? 'true' : 'false';
    });
  }
};

loadUserData();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = document.querySelector('#name').value;
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  let dobInput = document.querySelector('#dob');
  let dob = document.getElementById('dob').value;
  let acceptedTerms = document.querySelector('#checkbox').checked;

  let date = new Date(dob);
  let nxtdate = new Date();
  let maxidate = (new Date(nxtdate.getFullYear() - 55, nxtdate.getMonth(), nxtdate.getDate()))
  let minidate = (new Date(nxtdate.getFullYear() - 18, nxtdate.getMonth(), nxtdate.getDate()));

  if (date < maxidate || date > minidate) {
        alert('Enter a valid date of birth- between 18 and 55 years ago.');
        return;
    }

  const user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptedTerms: acceptedTerms
  };

  let users = JSON.parse(localStorage.getItem('users')) || [];

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  let newRow = table.insertRow();
  let nameCell = newRow.insertCell();
  let emailCell = newRow.insertCell();
  let passwordCell = newRow.insertCell();
  let dobCell = newRow.insertCell();
  let acceptedTermsCell = newRow.insertCell();

  nameCell.innerText = name;
  emailCell.innerText = email;
  passwordCell.innerText = password;
  dobCell.innerText = new Date(user.dob).toISOString().slice(0,10);
  acceptedTermsCell.innerText = acceptedTerms ? 'true' : 'false';

  loadUserData();
});

form.addEventListener('reset', () => {
  table.innerHTML = '';
});
