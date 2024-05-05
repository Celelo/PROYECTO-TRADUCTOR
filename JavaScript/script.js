
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


let translateFromCode
let translateToCode

function addOptionsToSelects(languages) {
  languages.forEach(element => {
    $('#textSelect').innerHTML += `<option value="${element.code}">${element.name}</option>`;
    $('#translateSelect').innerHTML += `<option value="${element.code}">${element.name}</option>`;
    });

    $('#textSelect').addEventListener('click', () => {
      translateFromCode = $('#textSelect').value
    })

    $('#translateSelect').addEventListener('click', () => {
      translateToCode = $('#translateSelect').value
    })
}

fetchData();

$('#textSelect').addEventListener('click', () => {
  initTextSelect = $('#textSelect').value;
});

$('#translateSelect').addEventListener('click', () => {
  TranslateTextSelect = $('#translateSelect').value;
});

$('#btn').addEventListener('click', async () => {
  let textToTranslate = $('#textInput').value; 
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
    .then(response => {
      $('#textResolved').value = response.data.translatedText
    })
    .catch(err => console.error('Error:', err));
});