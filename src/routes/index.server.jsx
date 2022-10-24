import Layout from '../components/Layout.server';

export default function Home() {
  return (
    <Layout>
      <div className="container pt-2 flex items-center justify-center flex-col prose">
        <h1>Homepage</h1>
      </div>
    </Layout>
  );
}