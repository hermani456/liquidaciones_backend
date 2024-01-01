// regex verify mail
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// console.log(validateEmail("asd@asd.cl"));

const checkRut = (rut) => {
  let valor = rut.replace(/\./g, "");
  valor = valor.replace(/-/g, "");
  const cuerpo = valor.slice(0, -1);
  if (cuerpo.length > 8) {
    return false;
  }
  let dv = valor.slice(-1).toUpperCase();
  rut.value = cuerpo + "-" + dv;
  let suma = 0;
  let multiplo = 2;
  for (let i = 1; i <= cuerpo.length; i++) {
    let index = multiplo * valor.charAt(cuerpo.length - i);
    suma = suma + index;
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }
  let dvEsperado = 11 - (suma % 11);
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;
  if (dvEsperado != dv) {
    return false;
  }
  return true;
};

console.log(checkRut("177974625"));


const username = 'admin';
const password = 'admin';
const url = 'http://localhost:3000'; // replace with your server's URL

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

fetch(url, { headers })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Authentication failed');
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));

axios request with headers
const axios = require('axios');

const username = 'admin';
const password = 'admin';
const url = 'http://localhost:3000'; // replace with your server's URL

const headers = {
  'Authorization': 'Basic ' + btoa(username + ":" + password)
};

axios.post(url, { headers })