import Head from 'next/head';

const layoutStyle = {
  margin: 20,
  padding: 20,
};

const Layout = props => (
  <div>
    <Head>
      <title>Longreads</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="/static/app.css" rel="stylesheet" key="test" />
    </Head>
    <div style={layoutStyle}>{props.children}</div>
  </div>
);

export default Layout;
