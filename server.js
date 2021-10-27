const express = require('express');
const app = express();
const session = require('express-session');
const mysql = require('mysql2');
const ejs = require('ejs')
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const pdfjs = require('pdfjs-dist');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/', express.static('public'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`app listening on port ${PORT}!`)
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

async function renderIndex(req, res) {
  res.render('index', {data: {}})
}

const connection = mysql.createConnection( { host: "localhost",user: "root",password: "" ,database: "ProofDocDatabase"} );

connection.connect(function(e) {
    if (e) {
        throw e;
    }
    else {
       console.log("Connection to database established..");
    }
});

app.get("/", renderIndex);

app.get("/index", function(request, response){
  response.render('index', {data: {}});
});

app.get("/registration", function(request, response){
  response.render('registration', {data: {}});
});

app.get("/myWork", function(request, response){
  response.render('myWork', {data: {}});
});

app.get("/uploadWork", function(request, response){
  response.render('uploadWork', {data: {}});
});

app.get("/findWork", function(request, response){
  response.render('findWork', {data: {}});
});


app.get("/showWork", function(request, response){
  request.session.workID = request.query.workID;
  response.render('showWork', {data: {}});
  // showWork();
});

app.get("/findShowWork", function(request, response){
  request.session.workID = request.query.workID;
  response.render('showAllWork', {data: {}});
  // showWork();
});

app.get("/myWork/displayWork", displayWork);

app.get("/findWork/displayAllWork", displayAllWork);

app.get("/pdfFile", renderPDF);

app.get("/allPDFFile", renderAllPDF);

app.get("/myWork/getAcountName", getAcountName);

app.get("/uploadWork/getAcountName", getAcountName);

app.get("/findWork/getAcountName", getAcountName);

app.post("/auth", login);

app.post("/register", register);

app.post("/logout", logout);

app.get("/image.png", profilePicDisplay);

app.get("/accountName", displayAllWork);

app.post("/uploadReview", uploadReview);

app.get("/showWork/data", sendReviews);


//Login
async function login(request, response) {
	let email = request.body.email;
	let password = request.body.password;
	if (email && password) {
		connection.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
        let userID = results[0].userID;
				request.session.loggedin = true;
				request.session.email = email;
				request.session.userID = userID;
				response.redirect('/myWork');
			} else {
        // response.redirect('/index');
        response.send("email and password does not match!");


			}
			response.end();
		});
	};
}
//

//Register
async function register(request, response) {
	let fName = request.body.fName;
	let lName = request.body.lName;
	let email = request.body.email;
	let password = request.body.password;
	let repeatPassword = request.body.repeatPassword;
	let userTypeDrop = request.body.userTypeDrop;


	if (password == repeatPassword) {

		connection.query('SELECT * FROM Users WHERE email = ?', [email], function(error, results, fields) {
			if (results.length > 0) {
				// "ER_Dup_ENTRY"
				response.send('This email already has an account saved');
			} else {

				connection.query('INSERT INTO Users(fName, lName, email, password, userType) VALUES(?, ?, ?, ?, ?)', [fName, lName, email, password, userTypeDrop], function(error, results, fields) {
					if (error) {
						throw error;
					}
					else {
						console.log("data added...");
						response.redirect("/index");
					}
				});

			}
		});

	} else {
		response.send('Passwords do not match');
	}
}
//

//logout
async function logout(request, response){
	if (request.session.loggedin == true) {
		request.session.loggedin = false;
		response.redirect("/index");
	} else {
		response.redirect("/index");
	}
}
//

//Display profile picture
async function profilePicDisplay(request, response) {
	let email = request.session.email;
	connection.query('SELECT userType FROM Users WHERE email = ?', [email], function(error, results, fields) {
			if (results[0].userType == "lecturer") {
				response.sendFile(path.join(__dirname, "/public/Images/Lecturer.png"));
			}else if (results[0].userType == "student") {
				response.sendFile(path.join(__dirname, "/public/Images/Student.png"));
			} else {
				response.sendFile(path.join(__dirname, "/public/Images/Other.png"));
			}
	});
}
//

//Display account name
async function displayAccName(request, response) {
	let email = request.session.email;
	connection.query('SELECT fName, lName FROM Users WHERE email = ?', [email], function(error, results, fields) {
		console.log(results);
		response.send(results[0].fName, results[0].lName);
	});
}
//


//Upload work
const storage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, './uploads/Work');
    },

    filename: function(request, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage,
  fileFilter: function(request, file, cb) {
    if (
      !file.mimetype.includes("pdf")
    ) {
      return cb(null, false, new Error("Only pdf files are allowed"));
    }else {
    cb(null, true);
    }
  }
});

//upload work to database and add to work folder
app.post("/uploadForm",upload.single("browse"), function (request, response) {
	let userID = request.session.userID;

  if (!request.file) {
    console.log("No file received");
    response.redirect('/uploadWork');
  } else{
  	console.log('file received');
    connection.query('INSERT INTO Work(userID, name, type, size) VALUES (?, "'+ request.file.filename +'", "'+request.file.mimetype+'", "'+request.file.size+'")', [userID], function(error, results, fields) {
			if (error) {
				throw error;
			}else {
				response.redirect('/myWork');
			}
		});
	}
});
//

//Upload Review
async function uploadReview(request, response){
  let text = request.body.reviewText;
  let userID = request.session.userID;
  let workID = request.session.workID;

  let reviewName = "review" + Date.now();

  fs.writeFile(__dirname + "/Uploads/Reviews/" + reviewName + ".txt", text, (err) => {
    // In case of a error throw err.
    if (err) {
      throw err;
    }else {
      let stats = fs.statSync(__dirname + "/Uploads/Reviews/" + reviewName + ".txt");
      let fileSize = stats.size/1000;

      connection.query('INSERT INTO Reviews(userID, workID, name, type, size) VALUES (?, ?, ?, ?, ?)', [userID, workID, reviewName, "application/txt", fileSize], function(error, results, fields) {
        if (error) {
          throw error;
        }
      });
      response.redirect("/myWork");
    }
  });

}

//sends reviews to review page so they can be displayed
async function sendReviews(request, response){
  let userID = request.session.userID;
  let workID = request.session.workID;
  let arr = [];
  let tempText;
  let reviewName;
  let data;

  connection.query('SELECT Users.userType, Reviews.reviewID, Reviews.name FROM Reviews Join Users ON Users.userID=Reviews.userID WHERE workID = ?', [workID], function(error, results, fields) {


    for (i = 0; i < results.length; i++){

      reviewName = results[i].name;

      data = fs.readFileSync(__dirname + "/Uploads/Reviews/" + reviewName + ".txt", "utf8");

      obj = {text: data, ID: i, reviewer: results[i].userType};

      arr[i] = obj;
    }


    response.send(arr);

  });
}



async function displayWork(request, response) {
  let userID = request.session.userID;
  connection.query('SELECT workID, name FROM Work WHERE userID = ?', [userID], function(error, results, fields) {
    let workArr = results;
    response.send(workArr);
  });
}

async function displayAllWork(request, response) {
  let userID = request.session.userID;
  connection.query('SELECT workID, name FROM Work', function(error, results, fields) {
    let workArr = results;
    response.send(workArr);
  });
}

async function renderPDF(request, response){
  let workID = request.session.workID;
  connection.query('SELECT name FROM Work WHERE workID = ?', [workID], function(error, results, fields) {
    let tempFileName = results[0].name;

    let filePath = __dirname + "/Uploads/Work/" + tempFileName;

    fs.readFile(filePath , function (err,data){
      response.contentType("application/pdf");
      response.send(data);
    });

  });
}

async function renderAllPDF(request, response){
  let workID = request.session.workID;
  connection.query('SELECT name FROM Work WHERE workID = ?', [workID], function(error, results, fields) {
    let tempFileName = results[0].name;

    let filePath = __dirname + "/Uploads/Work/" + tempFileName;

    fs.readFile(filePath , function (err,data){
      response.contentType("application/pdf");
      response.send(data);
    });

  });
}

async function getAcountName(request, response){
  let userID = request.session.userID;
  connection.query('SELECT fName, lName FROM users WHERE userID = ?', [userID], function(error, results, fields) {
    response.send(results);
  });
}
