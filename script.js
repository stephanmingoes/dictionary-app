let audio;
let dictionary = {
  fetchWord: function (word) {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.updateUI(data[0]);
      });
  },

  updateUI: function (data) {
    const { word } = data;
    const { phonetic } = data;
    const { definition } = data?.meanings[0]?.definitions[0];

    const { example } = data.meanings[0]?.definitions[0];

    const { partOfSpeech } = data?.meanings[0];

    audio = new Audio(data?.phonetics[0]?.audio);
    word
      ? (document.querySelector(".word").innerHTML = word)
      : (document.querySelector(".word").innerHTML = "");
    phonetic
      ? (document.querySelector(".phonetic").innerHTML = phonetic)
      : (document.querySelector(".phonetic").innerHTML = "");
    definition
      ? (document.querySelector(".def").innerHTML = "1. " + definition)
      : (document.querySelector(".def").innerHTML = "");

    example
      ? (document.querySelector(".ex").innerHTML = '"' + example + '"')
      : (document.querySelector(".ex").innerHTML = "");
    partOfSpeech
      ? (document.querySelector(".part_of_speech").innerHTML = partOfSpeech)
      : (document.querySelector(".part_of_speech").innerHTML = "");
  },
};

document
  .querySelector(".input-feild")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      dictionary.fetchWord(this.value);
    }
  });
document.querySelector(".search button").addEventListener("click", function () {
  dictionary.fetchWord(document.querySelector(".input-feild").value);
});

document
  .querySelector(".word_button button")
  .addEventListener("click", function () {
    audio.play();
  });

dictionary.fetchWord("food");
