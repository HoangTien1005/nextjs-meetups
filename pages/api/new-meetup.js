import { connectToDatabase } from "../../lib/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // const client = await MongoClient.connect('mongodb+srv://htien:1234@cluster0.cm85q.mongodb.net/meetups?retryWrites=true&w=majority')
    // const db = client.db()

    // const meetupsCollection = db.collection('meetups')

    // const result = await meetupsCollection.insertOne(data)

    // console.log(result)

    // client.close()

    const { db } = await connectToDatabase();
    const result = await db.collection("meetups").insertOne(data);
    console.log(result);

    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
