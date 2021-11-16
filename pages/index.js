import Head from "next/head";

import { connectToDatabase } from "../lib/mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS Meetups</title>
        <meta
          name="description"
          content="Browse a list of active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from an API

  // const client = await MongoClient.connect(
  //   "mongodb+srv://htien:1234@cluster0.cm85q.mongodb.net/meetups?retryWrites=true&w=majority"
  // );
  // const db = client.db();

  // const meetupsCollection = db.collection("meetups");
  // const meetups = await meetupsCollection.find().toArray();

  const {db} = await connectToDatabase()
  const meetups = await db.collection("meetups").find({}).toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//   // fetch data from an API
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export default HomePage;
