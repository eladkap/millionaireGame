function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ReadTextFile(file) {
  var allText = "";
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return allText;
}

function CheckPointPrize(questionIndex) {
  let currPrize = parseInt(MONEY_VALUES[questionIndex].replace(",", ""));
  if (currPrize < 1000) {
    return 0;
  }
  if (countPrize < 32000) {
    return 1000;
  }
  if (countPrize < 1000000) {
    return 32000;
  }
}
