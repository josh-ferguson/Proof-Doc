window.onload = function(){



async function showReviewOnLoad() {

  let res = await fetch('/showWork/data');
  let data = await res.json();

  if (data.length > 0) {
    let textarea = document.getElementById("displayReviewTextarea");
    textarea.textContent = data[0].text;

    let reviewNumElem = document.getElementById("review-num");
    reviewNumElem.textContent = 1;

    let reviewCountElem = document.getElementById("review-count");
    reviewCountElem.textContent = data.length;

    console.log(data);

    let reviewerPic = document.getElementById("reviewer").src = "/Images/" + data[0].reviewer + ".png";
  }else {
    let reviewNumElem = document.getElementById("review-num");
    reviewNumElem.textContent = 0;

    let reviewCountElem = document.getElementById("review-count");
    reviewCountElem.textContent = 0;

    let reviewerPic = document.getElementById("reviewer");
    reviewerPic.parentNode.removeChild(reviewerPic);

  }


}

showReviewOnLoad();


}

async function nextRev() {
  let res = await fetch('/showWork/data');
  let data = await res.json();
  let textarea = document.getElementById("displayReviewTextarea");

  let reviewNumElem = document.getElementById("review-num");
  let num = parseInt(reviewNumElem.textContent);

  let reviewCountElem = document.getElementById("review-count");
  let count = parseInt(reviewCountElem.textContent);
  let reviewerPic = document.getElementById("reviewer");



  if (num < count) {
    num += 1;
    textarea.textContent = data[num - 1].text;
    reviewNumElem.textContent = num;
    reviewerPic.src = "/Images/" + data[num - 1].reviewer + ".png";
  };




}

async function prevRev(){
  let res = await fetch('/showWork/data');
  let data = await res.json();
  let textarea = document.getElementById("displayReviewTextarea");

  let reviewNumElem = document.getElementById("review-num");
  let num = parseInt(reviewNumElem.textContent);

  let reviewCountElem = document.getElementById("review-count");
  let count = parseInt(reviewCountElem.textContent);
  let reviewerPic = document.getElementById("reviewer");

  if (num > 1) {
    num -= 1;
    textarea.textContent = data[num - 1].text;
    reviewNumElem.textContent = num;
    reviewerPic.src = "/Images/" + data[num - 1].reviewer + ".png";
  };

}
