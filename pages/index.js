import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Home.module.css'

export default function Home({ jobs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>nextjs job list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {jobs.map(job => {
            return (
              <a key={job.id} href={job.applyUrl} className={styles.card}>
                <h3>{ job.title }</h3>
                <h5><strong>company:</strong> { job.company.name }</h5>
                <p><strong>job posted:</strong> { new Date(job.postedAt).toLocaleDateString("en-US") }</p>
              </a>
            );
          })}
        </div>
      </main>
      </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.graphql.jobs/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query {
        jobs{
          id
          title
          slug
          company{
            id
            name
          }
          postedAt
          applyUrl
        }
      }

    `
  });

  return {
    props: {
      jobs: data.jobs
    }
  }
}