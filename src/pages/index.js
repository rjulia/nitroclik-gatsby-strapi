import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"

const IndexPage = ({ data: { allStrapiArticle: { edges } } }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {edges.map(doct => {
        const doc = doct.node
        return (<li key={doc.id}>
          <h2><Link to={`/${doc.id}`}> {doc.title}</Link></h2>
          <Img fixed={doc.image.childImageSharp.fixed} />
          <ReactMarkdown source={doc.content}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
          />

        </li>)
      })}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`

  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
          image {
          childImageSharp {
              fixed (width:200, height:125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }

`
