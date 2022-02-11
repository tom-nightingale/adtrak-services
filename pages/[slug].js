import { useState } from 'react';
import Head from 'next/head'
import { request } from "../lib/datocms";
import { renderMetaTags } from "react-datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { fade, tierVariants, listVariants, featureVariants } from "../lib/transitionHelpers"
import Layout from '../components/layout'
import Header from '../components/header'
import Hero from '../components/hero'
import Login from '../components/login'
import Footer from '../components/footer'
import Container from '../components/container'
import IconThumb from '../components/iconThumb'
import { motion } from 'framer-motion'
import Feature from "../components/feature";
import MostPopular from "../components/most-popular";
import { useSession } from 'next-auth/client';
import { getStaticProps } from '.';

export default function Page ({ data: {home, page, site, features} }) {
    return(

    )
};

const QUERY = `
query Page {
    site: _site {
      faviconMetaTags {
        ...metaTagsFragment
      }
    }
    home {
      heroLinks {
        ... on HostingRecord {
          pageTitle
          heroTitle
          slug
        }
        ... on PaidMarketingRecord {
          pageTitle
          heroTitle
          slug
        }
        ... on InternetMarketingRecord {
          pageTitle
          heroTitle
          slug
        }
        ... on WebDesignRecord {
          pageTitle
          heroTitle
          slug
        }
        ... on SocialRecord {
          pageTitle
          heroTitle
          slug
        }
      }
    }
    ${metaTagsFragment}
    ${responsiveImageFragment}
}
`

export default function  getStaticPaths() {
    const data = await request( {
        query: `{ allPages { slug } }` 
    });
    return {
        paths: data.allPages.map((page) => `/${page.slug}`),
        fallback: false,
    }
}

export async function getStaticProps() {
    const data = await request({
        query: QUERY
    });
    return(
        props: { data }
    )
}