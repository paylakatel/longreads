import Head from 'next/head'
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
}

const Layout = (props) => (
  <div>
    <Head>
      <title>Longreads</title>
      <link href="/static/app.css" rel="stylesheet" key="test"/>
    </Head>
    <div style={layoutStyle}>
      <Header />
      {props.children}
    </div>
  </div>
)

export default Layout