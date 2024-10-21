const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const storeRoutes = require('./routes/store.routes');
const authRoutes = require('./routes/auth.routes');
const User = require('./models/user.model');
const Store = require('./models/store.model');

const app = express();
app.use(bodyParser.json());

app.use('/api/stores', storeRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error syncing database: ', err);
  });
