This is an Assignment for the Backend Intern Position at GrowthX

## Instructions
Both Frontend and Backend parts are implemented for better testing and visualization.

As the assignment was for backend intern position, the main focus is on backend part rather than frontend. UI is simple just to understand the working of api and user management.

For this specific project, env file data like Database URI and JWT secret key are hardcoded rather than using .env file.

This project is created in Next.js


## Getting Started
First, install required dependencies using ``` npm i, yarn i ```

Then, run the development server using any of these commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# BACKEND
-- Database Connection and Schema are created under `src/app/server` folder.

**API CALLS**
All the apis are present in `src/app/api` folder.
********
--- API Folder --
- In `api/(auth)` folder, login, logout and register api logic is implemented.
- In `api/admin` folder, assignments assigned to admin, accepting and rejecting assignments logic is implemented.
- In `api/user` folder, assignment upload and get all admins logic is implemented.
- There are some other folders like misc, getToken which are used for other operations resulting in better working of app.

```(auth)```
**Login**
- In Login API, email and password are collected from request body. After collecting data, it is checked whether a user is present in database or not. if not present, then error is thrown else password is checked (if it's right or not) using bcrypt dependency. If password is right, Token is created and it's value is stored in cookies else error is thrown.

**Register**
- In Register API, data is collected from request body. After collecting data, it is checked whether a user is present in database with same email. If yes, then error is thrown else password is crypted using bcrypt dependency. Then user is saved in database according to type(user or admin).

**Logout**
- Token value is set to empty string

```admin```
**Assigned Assignments**
- Admin id is sent from frontend through params. Using that id, database is searched and all assigned assignments are extracted.
  
**Accept/Reject Assignmnets**
- In database, an entry isRejected(string) is created which can take only three values '1','2','3'. By default, it is set to '1' which means no action is taken.
- In accepting, assignment and admin are searched using their ids. After founding the entry, isRejected is set to '2' for that particular assignment for the admin.
- In rejecting, assignment and admin are searched using their ids. After founding the entry, isRejected is set to '3' for that particular assignment for the admin.

```user```
**Upload**
- Data is sent to backend which contains assignment, admin id and user name. An entry is created using the post request into the database.

**Get Admins**
- Using get request all admins are searched.

# FRONTEND
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Main Page**
On Main Page, you will get the Login / Register Button. Upon clicking on it, you will be redirected to Login Page. If you haven't created an account click on Create New Account.

**Creating New Account**
Enter all the details required for creating the account. If you want to create an ADMIN Account, click on Create Admin Account. For this specific project, admin account creation link is public. Follow similar steps to create the admin account.

**Login to your account**
After account creation you will be redirected to login page. Enter the details to login.

**Post Login**
```For User Account```
-- If you are user, you will see two buttons, one for logout and another to go to profile section. On clicking Logout you will be Logged out and will be redirected to Home Page.
-- On clicking profile button, you will be redirected to profile page. Profile Page is divided into two parts, in left one you can submit your assignment and assign the admin. In right section, all of your assignmnets and their status will be displayed.

```For Admin Account```
-- If you are an admin, you will see two buttons, one for logout and another to go to dashboard. On clicking Logout you will be Logged out and will be redirected to Home Page.
-- On clicking dashboard button, you will be redirected to dashboard page. On Dashboard Page, all of your assigned assignmnets and their status will be displayed. You will have the option to reject and accept the assignments.