import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodb";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        ></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  // const client = await MongoClient.connect(
  //   "mongodb+srv://htien:1234@cluster0.cm85q.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  // const db = client.db();

  // const meetupsCollection = db.collection("meetups");
  // const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // client.close();

  const {db} = await connectToDatabase()
  const meetups = await db.collection("meetups").find({}, {_id: 1}).toArray()

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  // const client = await MongoClient.connect(
  //   "mongodb+srv://htien:1234@cluster0.cm85q.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  // const db = client.db();

  // const meetupsCollection = db.collection("meetups");

  // const selectedMeetup = await meetupsCollection.findOne({
  //   _id: ObjectId(meetupId),
  // });

  // client.close();

  const {db} = await connectToDatabase()
  const selectedMeetup = await db.collection("meetups").findOne({_id: ObjectId(meetupId)})

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
