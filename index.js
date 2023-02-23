const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.slnidz9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const specialProductCollection = client.db('pharma_db').collection('special_products');
    const allProductCollection = client.db('pharma_db').collection('all_products');
    const employeeCollection = client.db('pharma_db').collection('employee');
    
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
    
    app.post('/employees', async (req, res) => {
      const employee = req.body;
      const result = await employeeCollection.insertOne(employee);
      res.send(result);
    });
    app.get('/employees', async (req, res) => {
      const employee = await employeeCollection.find().toArray();
      res.send(employee);
    });
    app.get('/employees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const employee = await employeeCollection.findOne(query)
      res.send(employee)
    })

    app.put('/employees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const employee = req.body;
      const updateDocument = {
        $set: {
          name: employee.name,
          age: employee.age,
          department: employee.department,
          salary: employee.salary,
          annualLeave: employee.annualLeave,
          imageSrc: employee.imageSrc,
          presentAddress: employee.presentAddress,
          email: employee.email,
          phone: employee.phone,
          permanentAddress: employee.permanentAddress
        }
      };
      const options = { upsert: true };
      const result = await employeeCollection.updateOne(query, updateDocument, options);
      res.send(result);
    });

    app.delete('/employees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await employeeCollection.deleteOne(query);
      res.send(result);
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