const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const bodyParser = require('body-parser'); 
let fs = require("fs");
const app = express();
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
(async function run() {
  app.locals.collection = mongoClient.db("volgadb").collection("users-setting");
  app.listen('8080')
})();
const jsonParser = express.json();
const parser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.get("/info", function (req, res) {
  if (req.headers.cookie === undefined) {
    res.redirect("/");
  } else {
    res.render("pages/main.ejs", {
      title: "Информация",
      page: "info",
      style: `
    <style>
    #page-block{ 
      padding:10px
    }
    .meg {
      border-right: 17px solid #475fd0;

      }
        .meg-parr {

          background-color: #475fd0;

      }
            .meg-rect {

              background-color: #475fd0;
            }
.tutorial-text{ 
  color: #475fd0; 
}
    </style>
  `,
    });
  }
});

app.get("/", jsonParser, async (req, res) => {
  const collection = req.app.locals.collection;
  let userID = new objectId(req.params.id).toString();
  if (
    req.headers.cookie === undefined ||
    req.headers.cookie === "" ||
    req.headers.cookie === " "
  ) {
    res.cookie("userID", userID);
    let userSetting = {
      _id: userID,
      balance: "250",
      price: "27",
      tripNum: "20",
      firstStation: "Мигалово",
      secondStation: "Энергоремонт",
      busRegistratioNumber: "А 069 ТО",
      date: "10 декабря 2022, ",
      time: "16:33",
    };
    try {
      await collection.insertOne(userSetting);
      res.render("pages/main.ejs", {
        page: "fakebus",
        title: "Главная",
        style: `
        <style>
        
            .square-service {
              background: #475fd0;
              
          }
          .square-service-white {

            border: 1px solid #475fd0;

        }
        .service-text{ 
          color: #475fd0;
        }
        </style>
      `,
        balance: userSetting.balance,
        price: userSetting.price,
        tripNum: userSetting.tripNum,
        firstStation: userSetting.firstStation,
        secondStation: userSetting.secondStation,
        busRegistratioNumber: userSetting.busRegistratioNumber,
        date: userSetting.date,
        time: userSetting.time,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  } else {
    let id = req.headers.cookie.slice(7);
    try {
      let user = await collection.findOne({ _id: id });
      res.render("pages/main.ejs", {
        style: `
        <style>
            .square-service {
              background: #475fd0;
              
          }
          .square-service-white {

            border: 1px solid #475fd0;

        }
        .service-text{ 
          color: #475fd0;
        }
        </style>
      `,
        page: "fakebus",
        title: "Главная",
        balance: user.balance,
        price: user.price,
        tripNum: user.tripNum,
        firstStation: user.firstStation,
        secondStation: user.secondStation,
        busRegistratioNumber: user.busRegistratioNumber,
        date: user.date,
        time: user.time,
      });
    } catch (err) {
      console.log(err);
      res.clearCookie("userID");
      res.sendStatus(500);
    }
  }
});
app.put("/setting", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const balanceNew = req.body.balance;
  const priceNew = req.body.price;
  const tripNumNew = req.body.tripNum;
  const firstStationNew = req.body.firstStation;
  const secondStationNew = req.body.secondStation;
  const busRegistratioNumberNew = req.body.busRegistratioNumber;
  const dateNew = req.body.date;
  const timeNew = req.body.time;
  const id = req.headers.cookie.slice(7);
  const collection = req.app.locals.collection;
  try {
    const result = await collection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          balance: balanceNew,
          price: priceNew,
          tripNum: tripNumNew,
          firstStation: firstStationNew,
          secondStation: secondStationNew,
          busRegistratioNumber: busRegistratioNumberNew,
          date: dateNew,
          time: timeNew,
        },
      }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/setting", async (req, res) => {
  if (req.headers.cookie === undefined) {
    res.redirect("/");
  } else {
    const collection = req.app.locals.collection;
    const id = req.headers.cookie.slice(7);
    try {
      let user = await collection.findOne({ _id: id });
      let datetime = "";
      if (user.date == "" && user.time == "") {
        datetime = "";
      }
      if (user.date == "" && user.time != "") {
        datetime = user.time;
      }
      if (user.date != "" && user.time == "") {
        datetime = user.date;
      }
      if (user.date != "" && user.time != "") {
        datetime = `${user.date} ${user.time}`;
      }
      if (
        user.tripNum == " " ||
        user.tripNum == "" ||
        user.tripNum == undefined ||
        user.tripNum == "-- Выберите остановку --"
      ) {
        res.render("pages/main.ejs", {
          page: "ticket-setting",
          title: "Настройки",
          style: `
        <style>
          .profile-text{
            color: #475fd0;
          }
          .head-icon{
            background: #475fd0;
          }  
          .body-icon{ 
            background: #475fd0;
          }
        </style>
      `,

          balance: user.balance,
          price: user.price,
          tripNum: user.tripNum,
          firstStation: user.firstStation,
          secondStation: user.secondStation,
          busRegistratioNumber: user.busRegistratioNumber,
          datetime: datetime,
          choiceStationFirst: "",
          choiceStationSecond: "",
        });
      } else if (user.tripNum != "") {
        let tripNum = user.tripNum;
        try {
          res.render("pages/main.ejs", {
            page: "ticket-setting",
            title: "Настройки",
            balance: user.balance,
            price: user.price,
            tripNum: user.tripNum,
            firstStation: user.firstStation,
            secondStation: user.secondStation,
            busRegistratioNumber: user.busRegistratioNumber,
            datetime: datetime,
            choiceStationFirst: "",
            choiceStationSecond: "",

            style: `
        <style>
          .profile-text{
            color: #475fd0;
          }
          .head-icon{
            background: #475fd0;
          }  
          .body-icon{ 
            background: #475fd0;
          }
        </style>
      `,
          });
        } catch (err) {
          res.sendStatus(500);
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
});
app.get("/profile", (req, res) => {
  if (req.headers.cookie === undefined) {
    res.redirect("/");
  } else {
    res.render("pages/main.ejs", {
      page: "profile",
      title: "Профиль",

      style: `
    <style>
      .profile-text{
        color: #475fd0;
      }
      .head-icon{
        background: #475fd0;
      }  
      .body-icon{ 
        background: #475fd0;
      }
    </style>
  `,
    });
  }
});
app.get('/payment' , function (req, res){ 
  if (req.headers.cookie === undefined) {
    res.redirect("/");
  }else{ 
    res.render('pages/main.ejs' , {
      page: "payment",
      title: "Оплата",
      style : `<style>
      .footer-menu {
        display: none;
      }</style>`
    })
  }
}); 



app.post('/confirm', parser, async(req, res)=>{ 
  if (!req.body) return res.sendStatus(400);
  const firstStation = req.body.firstStation; 
  const secondStation = req.body.secondStation; 
  const busRegestarationNumber = req.body.busRegestarationNumber;
  const tripNum = req.body.tripNum; 
  const date = req.body.date; 
  const time = req.body.time; 
  const routes = req.body.title; 
  const id = req.headers.cookie.slice(7);
  const collection = req.app.locals.collection;  

  try {
    let user = await collection.findOne({ _id: id })
    const price = user.price;
    const fullInfo = {
      'tripNum' : tripNum,
      'firstStation' : firstStation ,
      'secondStation' : secondStation , 
      'busRegestarationNumber': busRegestarationNumber , 
      'date' : date , 
      'time' : time , 
      'price' : price,
      'routes': routes
    }

    res.render('pages/main.ejs', {
      'page': 'confirmation', 
      'title': 'Подтверждение оплаты', 
      'style': `<style>.footer-menu{display:none;}</style>`,
      'routes': routes ,
      'station': firstStation, 
      'tripNum' : tripNum , 
      'price' : price, 
      'fullInfo': fullInfo
    })
  }
    catch(err){
      console.log(err);
  }
})
app.put('/pay-confirm' , jsonParser , async(req, res)=>{
  if (!req.body) return res.sendStatus(400);
  const tripNumNew = req.body.tripNum;
  const firstStationNew = req.body.firstStation;
  const secondStationNew = req.body.secondStation; 
  const busRegistratioNumberNew = req.body.busRegestarationNumber;
  const dateNew = req.body.date;
  const timeNew = req.body.time;
  const id = req.headers.cookie.slice(7);
  const collection = req.app.locals.collection;
  try {
    const result = await collection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          tripNum: tripNumNew,
          firstStation: firstStationNew,
          secondStation: secondStationNew,
          busRegistratioNumber: busRegistratioNumberNew,
          date: dateNew,
          time: timeNew,
        },
      }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
app.get("*", function (req, res) {
  res.redirect("/");
});
process.on("SIGINT", async () => {
  await mongoClient.close();
  process.exit();
});
