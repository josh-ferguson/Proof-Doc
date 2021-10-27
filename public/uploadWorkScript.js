window.onload = function(){

  async function showAccount() {
    let res = await fetch('/uploadWork/getAcountName');

    let accountName = await res.json();

    let fullName = accountName[0].fName + " " + accountName[0].lName;


    let accElement = document.getElementById("accountName");
    accElement.textContent = fullName;

  }

  showAccount();

}
