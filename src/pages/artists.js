import React from 'react'
import {useStaticQuery, graphql } from "gatsby"

import {RiMailSendFill, RiPhoneLine, RiUserLocationLine} from 'react-icons/ri'
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Artist} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"

const ArtistsPage = () => {
  const {wpcontent: {
    page: {
      artistsMeta: {
      artistsPageDescription,
      artistsPageHeaderPicture
      },
    },
    artists: {
      edges: artists
    }
  }} = useStaticQuery(graphql`
query {
  wpcontent {
    artists {
      edges {
        node {
          artist {
            firstName
            lastName
            artistName
            profile {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100, grayscale: true) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          slug
        }
      }
    }
    page(id: "artists", idType: URI) {
    artistsMeta {
      artistsPageDescription
      artistsPageHeaderPicture {
        altText
        sourceUrl
        imageFile {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }

  }
  }
}

  `)
  return (
    <Layout>
    <SEO title="Artists" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image fluid={artistsPageHeaderPicture.imageFile.childImageSharp.fluid} alt={artistsPageHeaderPicture.altText}/>
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are Inghelbrecht Agency</h2>
          <p>{artistsPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="artists">
          <h2>Our Artists</h2>
          <div className="artist-items">
            {artists.map(({ node: {artist, slug} }) => (
              <Artist to={`/${slug}`} key={slug}>
                <Image fluid={artist.profile.imageFile.childImageSharp.fluid} alt={artist.profile.imageFile.altText} />
                <div className="artist-info">
                  <p>{artist.firstName} {artist.lastName}</p>
                  {artist.artistName && <p>{artist.artistName}</p>}
                </div>
              </Artist>
            ) )}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default ArtistsPage
