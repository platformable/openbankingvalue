import Head from "next/head";

const Meta = ({ title, keywords,excerpt, data }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta
        name="description"
        content={excerpt}
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={'Open Banking Value Tool'} />
      <meta
        name="twitter:description"
        content={excerpt?.replace(/(<([^>]+)>)/gi, "")}
      />
      {/* <meta name="twitter:site" content={`https://www.openbankingvalue.platformable.com/blog/${data?.slug}`} /> */}
      <meta
        name="twitter:image"
        content={'/obof_preview.png'}

      /> 

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={excerpt?.replace(/(<([^>]+)>)/gi, "")}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={'/obof_preview.png'}
      />
      <meta
        property="og:image:secure_url"
        content={'/obof_preview.png'}

      />
      <meta property="og:image:alt" content={'Open Banking Value Tool'} />
      <meta property="og:url" content={`https://www.openbankingvalue.platformable.com/`} />
      <meta property="og:site_name" content="openbankingvalue.platformable.com" />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Platformable: Open Banking Value Tool",
  keywords:
    "platformable, data, api, open ecosystems, open banking, open finance, open health, value generated, benefits, outcomes",
    excerpt:
    "What evidence do we have that open banking is really creating impactful benefits for all stakeholders across the ecosystem ?",
};

export default Meta;
