import Head from "next/head";

const Meta = ({ title, keywords,excerpt, data }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta
        name="description"
        content={excerpt?.replace(/(<([^>]+)>)/gi, "")}
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {/* <meta
        name="twitter:description"
        content={data?.excerpt?.replace(/(<([^>]+)>)/gi, "")}
      /> */}
      {/* <meta name="twitter:site" content={`https://www.openbankingvalue.platformable.com/blog/${data?.slug}`} />
      <meta
        name="twitter:image"
        content={
          data?.featured_img?.data?.attributes?.formats?.small?.url ||
          "https://res.cloudinary.com/platformable/image/upload/v1692982725/platformablewebsite2023/value_model_1280x720_ae8a224428.png"
        }
      /> */}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={excerpt?.replace(/(<([^>]+)>)/gi, "")}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={
          data?.featured_img?.data?.attributes?.formats?.small?.url ||
          "https://res.cloudinary.com/platformable/image/upload/v1692982725/platformablewebsite2023/value_model_1280x720_ae8a224428.png"
        }
      />
      <meta
        property="og:image:secure_url"
        content={
          data?.featured_img?.data?.attributes?.formats?.small?.url ||
          "https://res.cloudinary.com/platformable/image/upload/v1692982725/platformablewebsite2023/value_model_1280x720_ae8a224428.png"
        }
      />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={`https://www.openbankingvalue.platformable.com/`} />
      <meta property="og:site_name" content="platformable.com" />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Platformable: Open Banking Value Tool",
  keywords:
    "platformable, data, api, open ecosystems, open banking, open finance, open health, value generated, benefits, outcomes",
  description:
    "Platformable's Open Banking Value Tool describes the benefits and outcomes that have been achieved in the global open banking and open finance ecosystem",
};

export default Meta;
