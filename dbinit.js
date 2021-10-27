"use strict"

const express = require("express");
const mysql = require("mysql2");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root"
});

connection.connect(function(e) {
  if (e) {
    throw e;
  }
  else {
    console.log("connection to database established...");
  }
});

//create database
connection.query("create database if not exists ProofDocDatabase",
function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log("database created...");
});

//select database
connection.query("use ProofDocDatabase",
function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log("database selected...");
});

//creates Users table
connection.query("create table if not exists Users (userID int primary key auto_increment,fName varchar(30) not null,lName varchar(30) not null,email varchar(60) not null unique,password varchar(60) not null,userType char(8))",
function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log("Users table created...");
});

//creates Work table
connection.query("create table if not exists Work(workID int primary key auto_increment,userID int not null,name varchar(100) not null,type varchar(100) NOT NULL,size int(11) NOT NULL,timeUploaded datetime not null DEFAULT CURRENT_TIMESTAMP,constraint FK_user1 foreign key(userID) references Users (userID))",
function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log("Work table created...");
});

//creates Reviews table
connection.query("create table if not exists Reviews (reviewID int primary key auto_increment,userID int not null,workID int not null,name varchar(100) not null,type varchar(100) NOT NULL,size int(11) NOT NULL,timeUploaded datetime not null DEFAULT CURRENT_TIMESTAMP,constraint FK_user2 foreign key(userID) references Users (userID),constraint FK_work foreign key(workID) references Work (workID))",
function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log("Reviews table created...");
  process.exit();
});
