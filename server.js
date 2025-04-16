require('dotenv').config();

const express = require ('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');



// express app
const app = express();

//logging requests that come in (routes, / GET) middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes); //when I request /api/workouts, use workoutRoutes
app.use('/api/user', userRoutes);


// connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Server running on port", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })


