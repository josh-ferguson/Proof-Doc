# Proof-Doc
This web application was written in HTML, CSS and JavaScript. It allows the users to upload a document to the website. Reviewers can then proofread and comment
on the document. Then users can access the proofreaders comments and make adjustments to their work.

## The Problem to be Solved
The project focuses on the problem of students being disadvantaged due to poor literacy levels. The main categories of students this relates to are those with learning disabilities and international students. These students with some minor difficulties in writing should not be penalised unduly, and may have significant academic ability that may be hidden as a result of poor written English.

## Server Installation  
1. Clone this repository
2. Open CMD or Terminal
2. cd into the cloned repository directory
3. Type 'npm install' (This will install all of the dependencies/packages needed)
4. type 'npm run dbinit' (this will initialise the database - make sure you have mysql installed and running)
5. Type 'npm run start' to start the server.
6. Navigate to 'http://localhost:8080/' to display the website.

## Main Features
+ Allow users to login
+ Be able to save user login details securely
+ Allow the users to upload work
+ Store the uploaded work on a database
+ Display users uploaded work on the MyWork page
+ Allow reviewers to access the document and create reviews
+ Store the uploaded reviews on a database
+ Display the reviews for the publisher

## How to Use
### Login
+ Login to your account using your credentials.

![login](https://user-images.githubusercontent.com/43879432/183254741-487402d7-5e46-44c5-ba61-571f89af355d.jpg)

### Register
+ Register an account if you do not already have one.

![Register](https://user-images.githubusercontent.com/43879432/183254783-e1054bcc-26a7-4216-80d4-820ec92b9d53.jpg)

### My Work page
+ Here you will be able to view all of your work that you have uploaded. You will be able to view reviews on each piece of work by clicking on the item.

![MyWork](https://user-images.githubusercontent.com/43879432/183254854-7742916d-a929-470e-8138-6006a61925f8.jpg)

### Upload Work page
+ Here you will be able to upload you work.

![UploadWork](https://user-images.githubusercontent.com/43879432/183254887-4c516b91-4243-48d1-b722-6652f64865f9.jpg)

### Find Work page
+ Here you will be able to find other users work and will be able to review them by clicking on an item.

![FindWork](https://user-images.githubusercontent.com/43879432/183254950-2f46e3bb-2bb5-4f0a-81a7-2bdc6617982a.jpg)

### Show Work page
+ Here is where you will be able to view the reviews that other users have left on your work.

![ViewReviews](https://user-images.githubusercontent.com/43879432/183254983-ffde0b6f-1c61-4555-a03f-09bcc802469d.jpg)

### Review Work page
+ Here is where you will be able to write your own reviews on other users' work.

![WriteReview](https://user-images.githubusercontent.com/43879432/183255040-34674d24-75cd-4954-bea4-8c155fcf2a05.jpg)
