const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://admin:yF1dWmka1pEXvgG2@cluster0.slnidz9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const specialProductCollection = client.db('pharma_db').collection('special_products');
    const allProductCollection = client.db('pharma_db').collection('all_products');
    
    //get all Products
    app.get('/specialProducts', async (req, res) => {
      const tools = await specialProductCollection.find().toArray();
      res.send(tools);
    });

    
    app.get('/specialProducts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const tool = await specialProductCollection.findOne(query)
      res.send(tool)
    })


    //get all products
    app.get('/allProducts', async (req, res) => {
      const tools = await allProductCollection.find().toArray();
      res.send(tools);
    });

    app.get('/allProducts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const tool = await allProductCollection.findOne(query)
      res.send(tool)
    })
  }
  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello From my Pharma')
})

app.listen(port, () => {
  console.log(`pharma website listening on port ${port}`)
})