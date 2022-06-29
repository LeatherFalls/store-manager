const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();

const productRouter = require('./routes/productRouter');
const salesRouter = require('./routes/salesRouter');

app.use(bodyParser.json());
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use('/products', productRouter);

app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
