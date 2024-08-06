const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email, password, age } = req.body;
    let errors = [];

    if (!name || !/^[A-Za-z\s]{2,50}$/.test(name)) {
        errors.push("Name must be alphabetic and between 2 and 50 characters.");
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("Invalid email format.");
    }
    if (!password || password.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    }
    if (age && (!/^\d+$/.test(age) || age < 1 || age > 120)) {
        errors.push("Age must be a number between 1 and 120.");
    }

    if (errors.length > 0) {
        res.send(`<p class="error">${errors.join('<br>')}</p>`);
    } else {
        res.send('<p class="success">Validation successful!</p>');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});