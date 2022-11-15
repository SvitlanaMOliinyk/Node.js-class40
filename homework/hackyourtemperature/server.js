import express, { json } from 'express';
import { engine } from 'express-handlebars';
import * as path from 'path'
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('hello from backend to frontend!')
});

app.post('/weather', function (req, res) {
  const cityName = req.body;
  // res.render('main', {layout : 'index'})

  if(!cityName){
    return res.status(400).json({ message: `Please, enter the name of the city` })
  }
  res.status(200);
  res.json(cityName);
});

app.listen(3000, () => console.log(`server starts on 3000`))