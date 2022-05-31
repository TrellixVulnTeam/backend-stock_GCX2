const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const produtoRouter = require("./routes/produtoRouter");
const database = require('./config/db');

// Model synchronization
// nomeDaTabela.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
const modelSynchronization = async () => {
    try {
        const answer = await database.sync();
        console.log(answer, "Database connected");
    } catch (error) {
        console.log("Connection error", error);
    }
}
modelSynchronization();

app.use(express.json());
app.use(produtoRouter);

app.get("/", (req, resp) => resp.send("Application is up and running"));

//  function to answer GET requests pointing to the root of the site
app.listen(PORT, () => {
    console.log(`Service endpoint = http://localhost:${PORT}`);
});




