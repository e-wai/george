# G.e.o.r.g.e. (Hack Western 2020 - 3rd overall out of 103 teams)

Welcome to the G.e.o.r.g.e. repository! G.e.o.r.g.e. is a web application built to help users compare and order groceries at a single, convenient point. 

## About the project

This project was created for Hack Western 2020! We wanted to make life easier for the busy (and the cheap) - whether a university student or a parent. Instead of flipping through numerous fliers, or having to visit multiple stores to get cheaper products from each, our app presents users with price comparisons for requested items. From there, users can construct shopping lists for the best overall store by price, or select individual items and order them together through our platform.

## Tech stack

+ The frontend is a React web app using Firebase authentication and Firestore. It was deployed using Github pages. It implements Stripe UI components for the payment flow.

+ The backend was built using Python and Flask, using BeautifulSoup to parse HTML. It implements the Stripe API for processing payments. For our demo, we funnelled the backend from a localhost using Ngrok.

## Steps to view
This web app is deployed at https://e-wai.github.io/george/ however most features can't be accessed without the backend, whose repository is available [here](https://github.com/e-wai/george-backend). Unfortunately, this isn't publicly available as the .env file needed for configuration is not published to Github. Fortunately, we have a few screenshots available and a [demo video](https://www.youtube.com/watch?v=wxMHrHFsrss)! 
