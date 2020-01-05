const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const puppeteer = require('puppeteer');
var fs = require('fs');


/*
Correct Credintials:

Email: zakib@erabia.com

Passwrod: de4***feef516he6DD3$SA2
*/


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);




async function getLogin() {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://stg.erabia.io/erabiastore/?site=yerabiab2c-ae');
  await page.screenshot({path: 'Files/Login/yerabia.png'});
  await page.waitFor(1000);

  await page.click('body > main > header > nav.navigation.navigation--top.padd-wide > div > div > div.nav__left.js-site-logo.text-left > button');
  await page.waitFor(1000); 
  await page.click('body > main > header > nav.navigation.navigation--bottom.js_navigation--bottom.js-enquire-offcanvas-navigation.light > ul > li > a');
  await page.waitFor(1000); 

  await page.type('.login-left-content-component #j_username', 'zakib@erabia.com');
  await page.type('.login-left-content-component #j_password', 'de4***feef516he6DD3$SA2');
  await page.click('.login-left-content-component #loginForm > button');

}




async function getReg(user) {
console.log(user)
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
 
  let userCred = {

    fname:'Ammar',
    lname:'Halees',
    // email: user === undefined ||user==="" || user ===null?`${Math.random().toString(36).substring(7)}@gmail.com` : user,
    password: 'de4***feef516he6DD3$SA2',
    number:'0798949000',
  
  }

  await page.goto('https://stg.erabia.io/erabiastore/?site=yerabiab2c-ae');
  await page.screenshot({path: 'Files/Register/yerabia.png'});
  await page.waitFor(1000); 


  await page.click('body > main > header > nav.navigation.navigation--top.padd-wide > div > div > div.nav__left.js-site-logo.text-left > button');
  await page.waitFor(1000); 
  await page.click('body > main > header > nav.navigation.navigation--bottom.js_navigation--bottom.js-enquire-offcanvas-navigation.light > ul > li > a');
  await page.waitFor(1000); 
  
  

  page.hover(".user-register__headline")
  await page.screenshot({path: 'Files/Register/register.png'});

  await page.type('#firstName', userCred.fname);
  await page.type('#lastName', userCred.lname);

  await page.waitFor(1000); 

  await page.click('.row > .col-md-4 > div >div > div > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');


  await page.click('#registerForm > div:nth-child(5) > div > div > div > div > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');

  

  

  await page.click('#registerForm > div:nth-child(6) > div > div > div > div > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');

  await page.click('#registerForm > div:nth-child(7) > div > div > div.btn-group.bootstrap-select.day.form-control > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');


  await page.click('#registerForm > div:nth-child(7) > div > div > div.btn-group.bootstrap-select.month.form-control > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');


  await page.click('#registerForm > div:nth-child(7) > div > div > div.btn-group.bootstrap-select.year.form-control > button')

  for(let i =0; i<19 ; i++){


    await  page.keyboard.press('ArrowDown');

  }

  await   page.keyboard.press('Enter');

  await page.click('#registerForm > div:nth-child(8) > div > div > div > div > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');


  await page.click('#registerForm > div:nth-child(9) > div > div > div > div > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');


  await page.click('#registerForm > div:nth-child(10) > div.col-md-4.col-sm-5.col-xs-12 > div > div.control > div > button')
  await  page.keyboard.press('ArrowDown');
  await   page.keyboard.press('Enter');

  await page.type('#email',user);
  await page.type('#password', userCred.password);
  await page.type('#checkPwd', userCred.password);
  
  await page.type('#mobileNumber', userCred.number);


  

  await page.waitFor(1000); 

  await page.setViewport({ width: 1920, height: 1080 });

  await page.click('#termsandconditions')

  await page.click('#registerForm > div:nth-child(16) > div > div.form-actions.clearfix > button')

  


  await page.waitFor(3000); 

  page.hover(".carousel__component--headline")
  
  await page.screenshot({path: 'Files/Register/registerSuccessorFailure.png'});


  const result = await page.evaluate(() => {

    let myinfo = document.querySelector('body > main > div.padd-wide.content-page-design > div.global-alerts > div').innerText // Select all Products


    return myinfo; // Return our data array 

  })

  return result;


 }
 

app.get('/api/greeting', (req, res) => {
 


  res.setHeader('Content-Type', 'application/json');
 
    if(req.query.name ==="reg"){

      getReg(req.query.user).then((value) => {
        console.log(value); // Success!
      
        fs.writeFile('Files/Register/newfile.txt', JSON.stringify(value), function (err) {
          if (err) throw err;
          console.log('File is created successfully.');
        }); 
        
      
      
      }).then(()=>console.log("file created"));

    }

    else if(req.query.name ==="login"){


      getLogin()
      // getLogin().then((value) => {
      //   console.log(value); // Success!
      
      //   fs.writeFile('newfile.txt', JSON.stringify(value), function (err) {
      //     if (err) throw err;
      //     console.log('File is created successfully.');
      //   }); 
        
      
      
      // });
    }




res.send(JSON.stringify({ greeting: "hi" }));




});








app.listen(3002, () =>
  console.log('Express server is running on localhost:3002')
);