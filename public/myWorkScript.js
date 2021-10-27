
// const appjs = require('index.js');
window.onload = function(){




async function showContent() {
  let res = await fetch('/myWork/displayWork');
  let workArr = await res.json();


  let temp, item, a, i;
  //get the template element:
  temp = document.getElementsByTagName("template")[0];
  //get the DIV element from the template:
  item = temp.content.querySelector(".workUploaded");
  //for each item in the array:
  for (i = 0; i < workArr.length; i++) {

    //Create a new node, based on the template:
    a = document.importNode(item, true);
    //Add data from the array:

    let para = document.createElement("p");
    let node = document.createTextNode("Name: " + workArr[i].name);
    para.appendChild(node);

    a.appendChild(para);


    let paraa = document.createElement("p");
    let nodea = document.createTextNode("Code: " + workArr[i].workID);
    paraa.appendChild(nodea);

    a.appendChild(paraa);

    let workLink = document.createElement("a");

    workLink.className = "myWorkLink";
    workLink.href = "/showWork?workID=" + workArr[i].workID;
    workLink.id = workArr[i].workID

    a.appendChild(workLink);


    //append the new node wherever you like:
    document.getElementById("content").appendChild(a);

  }
}

async function showAccount() {
  let res = await fetch('/myWork/getAcountName');

  let accountName = await res.json();

  let fullName = accountName[0].fName + " " + accountName[0].lName;


  let accElement = document.getElementById("accountName");
  accElement.textContent = fullName;

}

showContent();
showAccount();


}
