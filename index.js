const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();

const productRouter = require('./routes/productRouter');
const salesRouter = require('./routes/salesRouter');
const productController = require('./controllers/productController');

app.use(bodyParser.json());

app.get('/products/search', productController.searchByName);

app.use('/products', productRouter);

app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
