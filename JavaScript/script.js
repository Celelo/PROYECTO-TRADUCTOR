// const $ = (element) => document.querySelector(element);
// let initTextSelect;
// let TranslateTextSelect;
// const url = 'https://text-translator2.p.rapidapi.com/translate'; // Definir url como variable global

// async function fetchData() {
//   const languagesUrl = 'https://text-translator2.p.rapidapi.com/getLanguages';

//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '9ed367b64amsh301c82186b38cccp158a21jsn82a5a9a0bbc9',
//       'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await fetch(languagesUrl, options);
//     const data = await response.json();
//     let languages = data.data.languages;

//     languages.forEach(element => {
//       $('#textSelect').innerHTML += `<option value="${element.code}">${element.name}</option>`;
//       $('#translateSelect').innerHTML += `<option value="${element.code}">${element.name}</option>`;
//     });

//     $('#textSelect').addEventListener('click', () => {
//       console.log($('#textSelect').value);
//       initTextSelect = $('#textSelect').value;
//     });

//     $('#translateSelect').addEventListener('click', () => {
//       console.log($('#translateSelect').value);
//       TranslateTextSelect = $('#translateSelect').value;
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchData(); 

// $('#btn').addEventListener('click', async () => {
//   let textTranslate = $('#textSelect').value;

//   const options = {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'X-RapidAPI-Key': '9ed367b64amsh301c82186b38cccp158a21jsn82a5a9a0bbc9',
//       'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
//     },
//     body: new URLSearchParams({
//       source_language: initTextSelect,
//       target_language: TranslateTextSelect,
//       text: textTranslate
//     })
//   };

//   try {
//     const response = await fetch(url, options); // Utilizar url definida globalmente
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// });




const $ = (element) => document.querySelector(element);
let initTextSelect;
let TranslateTextSelect;
const url = 'https://text-translator2.p.rapidapi.com/translate';

async function fetchData() {
  const languagesUrl = 'https://text-translator2.p.rapidapi.com/getLanguages';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9ed367b64amsh301c82186b38cccp158a21jsn82a5a9a0bbc9',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(languagesUrl, options);
    const data = await response.json();
    let languages = data.data.languages;
    addOptionsToSelects(languages);
  } catch (error) {
    console.error(error);
  }
}

// declaramos
let translateFromCode
let translateToCode

function addOptionsToSelects(languages) {
  languages.forEach(element => {
    $('#textSelect').innerHTML += `<option value="${element.code}">${element.name}</option>`;
    $('#translateSelect').innerHTML += `<option value="${element.code}">${element.name}</option>`;
    });

    console.log($('#textSelect').value);

    $('#textSelect').addEventListener('click', () => {
      // actializamos el valor
      translateFromCode = $('#textSelect').value
      console.log(translateFromCode);
    })

    $('#translateSelect').addEventListener('click', () => {
      // actializamos el valor
      translateToCode = $('#translateSelect').value
      console.log(translateToCode);
    })
}

fetchData();

$('#textSelect').addEventListener('click', () => {
  console.log($('#textSelect').value);
  initTextSelect = $('#textSelect').value;
});

$('#translateSelect').addEventListener('click', () => {
  console.log($('#translateSelect').value);
  TranslateTextSelect = $('#translateSelect').value;
});

$('#btn').addEventListener('click', async () => {
  let textToTranslate = $('#textInput').value;  // Obtiene correctamente el texto a traducir del campo de entrada

  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", translateFromCode);
  encodedParams.append("target_language", translateToCode);
  encodedParams.append("text", textToTranslate);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '9ed367b64amsh301c82186b38cccp158a21jsn82a5a9a0bbc9',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    body: encodedParams
  };

  fetch(url, options)
    .then(response => response.json())
    // lo imprimimos en pantalla
    .then(response => {
      $('#textResolved').value = response.data.translatedText
    })
    .catch(err => console.error('Error:', err));
});


// los console.log de laslineas 112 y 118 se repiten 