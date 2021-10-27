
drop database if exists ProofDocDatabase;
create database if not exists ProofDocDatabase;
use ProductDatabase;

create table if not exists Users (
  userID int primary key auto_increment,
  fName varchar(30) not null,
  lName varchar(30) not null,
  email varchar(60) not null unique,
  password varchar(60) not null,
  userType char(8)
;)

create table if not exists Work(
  workID int primary key auto_increment,
  userID int not null,
  name varchar(100) not null,
  type varchar(100) NOT NULL,
  size int(11) NOT NULL,
  timeUploaded datetime not null DEFAULT CURRENT_TIMESTAMP,
  constraint FK_user1 foreign key(userID) references Users (userID)
);

create table if not exists Reviews (
  reviewID int primary key auto_increment,
  userID int not null,
  workID int not null,
  name varchar(100) not null,
  type varchar(100) NOT NULL,
  size int(11) NOT NULL,
  timeUploaded datetime not null DEFAULT CURRENT_TIMESTAMP,
  constraint FK_user2 foreign key(userID) references Users (userID),
  constraint FK_work foreign key(workID) references Work (workID)
);
