//zmienne
const pathData = './dane.txt';
const path_Html = './artykul.html'
let message = [];

// bibloteka
const axios = require('axios');

const apiKey = '';

//Wczytanie pliku do zmiennej
function readText() {

  const fs = require('fs');
  try {
    message[0] = fs.readFileSync(pathData, 'utf8');
  } catch (err) {
    console.error('Błąd odczytu danych:', err);
  }
}

async function useAPI() 
{
  var x = 0;
  const request = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: message[x] }]
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      request,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    //odpowidź    
    const saveMessage = response.data.choices[0].message.content;

    const fs = require('fs');
    const dataWrite = saveMessage;

    // Zapisanie odpowiedzi
    fs.writeFile(path_Html, dataWrite, (err) => {
      if (err) {
        console.error('Błąd zapisu do pliku:', err);
      } else console.error('Zapisano:');
    });

  } catch (error) {
    console.error('Error calling GPT-3 API:', error.response ? error.response.data : error.message);
  }
  return;
}


function Start() {
  readText();

  //polecenia
  message[0] = 'Dodaj zancznik nagłówki do pojedynczych wierszy oprócz ostatnich dwuch dla reszty dodaj znacznik paragrafów kod powinien być gotowy do wklejenia bez znacznika body. Oraz wstaw znaczniki <img> z atrybutem src="image_placeholderjpg" oraz alt opisującym zdiecie które tam powinno się znaleść' + ' ' + message;
  useAPI();
}

Start();
