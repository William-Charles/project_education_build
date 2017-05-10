# mar-hackaton-fantastic-octo-lamp.

Hackaton End of Week 6. GET CRAZY CODING!

Ok there is a bit of setup to get this bad mamajama up and running.  

1. Fork and clone this repo  
2. cd into the project directory  
3. run $ npm i  
4. fire up your mongo database  
4. Now things get a little weird you will have to go to the facebook api page and register the app https://developers.facebook.com/   
5. add http://localhost:3000/ to the App domains  within settings
6. add http://localhost:3000/ to the site URL field within settings
7. run $ export FACEBOOK_APP_SECRET="WITH YOUR SECRET FROM THE FACEBOOK APP SETTINGS PAGE"  
8. run $ export FACEBOOK_APP_ID="WITH THE APP ID FROM THE FACEBOOK APP SETTINGS PAGE"  
9. run $ npm run seed  
10. run $ npm start  


**IMPORTANT: Modify this file to add description to how we will start/use your app.**
spark My Kid  
2 landing pages one for kids on for   parents/teachers  

spark.camp  
is kids landing page  

4 roles parent teacher

parent email/password

teachers have courses  
  courses have sections  
  revinue per courses  
  badges  
  total revinue  
  create a new courses  

  challenges
  quizes
  layers of sub categories  



student
  email password  
  courses
  status of the courses  
  how many challenges have been completed


admin  
  view of teachers status
  approval of courses  



Mongo data structure  

User  
