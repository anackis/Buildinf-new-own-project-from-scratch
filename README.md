# Web Bank App from scratch 
This app was created with React, Firebase, "Recharts",  "MUI"  and has a responsive design.

![home](https://github.com/anackis/Web_Bank_App_From_Scratch/assets/61510461/d516bea1-6919-4e4a-aa78-ba8ef387c816)

![main](https://github.com/anackis/Web_Bank_App_From_Scratch/assets/61510461/6152ad86-1ba7-4897-a03a-ccb5174ace18)

![404](https://github.com/anackis/Web_Bank_App_From_Scratch/assets/61510461/d618a9ef-770f-4b9e-bc85-84d559e0e52d)

![home-mobile](https://github.com/anackis/Web_Bank_App_From_Scratch/assets/61510461/3edc8192-c40a-4e28-a4f3-0517927697ae)

![main-mobile](https://github.com/anackis/Web_Bank_App_From_Scratch/assets/61510461/8ffa6991-0d6d-404e-996d-17ef6d8de2a7)

![404-mobile](https://github.com/anackis/Web_Bank_App_From_Scratch/assets/61510461/18d183bf-5ee0-45aa-b99b-02db850a2351)


At this moment the project has 3 pages.
1. Sign In / Sign up page. It has the functionality of Sign In / Sign up with Firebase Authentication. Has inputs validation as checking if the email is already used e.t.c. On every Sign Up creates a user profile in Firebase Database with parameters such as randomly generated front/back card number (front card number is checking for existing, in case of existing it regenerates), balance, balance history, created at info, Name and Surname, email and user profile Img.
2. Main page. The main page contains many React elements that can be used on different pages.
  2.1 Working navbar that currently has only 1 functional page "Dashboard" and pages "This section is in development. Coming soon." for other navbar tabs because now this app doesn't have much content for splitting it into pages ( Mostely this navbar was created to stick to design). This navbar was organized as a hamburger menu in smaller resolution adaptive versions of the app. 
  2.2 Profile element. Profile element display information about a user that comes from Firebase Database such as Name and Surname, user Img, balance, card number, and when the account was created. This component has 2 functional buttons. First, allow the user to upload his own Img for his profile which will be placed in Firebase Database and rerendered on the page after upload. The second button is the "Log Out" button.
  2.3 Total Income / Outcome element. This element takes balance history from Firebase DB and calculates the total amount and rerender it after any funds management.
  2.4 Analytics element. This element was created with "Recharts" that allow the easy create data graphs of many different styles and variations. I decided to take "TinyBarChart" for my app. It displays every Income / Outcome to your balance and as well rerenders after a history balance change on Firebase DB.
  2.5 All Free Bank Users element. This section was created with "MUI" help. This section has all users' data grid tables with filters and search. In this section, the user can find to who he wants to transfer funds and copy the card number for the transaction. 
  2.6 Card element. Element has a card with spin animation on drag, spin animation on button click, and user data as front/back card number, name surname, and balance. 
  2.7 Funds element. This element has two forms for adding funds and transaction creat. In adding the funds form for this version of the app user can add any funds amount to the balance. Transaction form has an input for funds amount to transfer and recipient card number. These inputs have validation as checking if a number was entered and if the recipient card number exists or not.
3. 404 page that appears in case of a "Page not found" error. It has a simple design and allows users to get back to the home page in case of an error. 

For design, I took as an example this Figma Template: https://www.figma.com/file/erkPgTCLes8KAfkpoebTpF/Dashboard-Finance-Bank-Fintech-(Community)?type=design&version-id=3380397783&node-id=114-31&t=YzRhVTaOCOg9DGC3-0

Login/Logout page design I created by myself and the 404 page as well.

Icons for the app: https://icons8.com/

Icon Pack: https://www.figma.com/file/5XM91ZUl6QbnfjGlfyfsyx/3D-icons-pack-(Community)?type=design&t=9qb9s22xe26GTC2M-0

