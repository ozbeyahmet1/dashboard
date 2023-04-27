import Head from "next/head";

export const HeadComponent = () => {
  return (
    <Head>
      {/* Meta tags */}
      <title>Innoloft | B2B platform solution</title>
      <meta name="description" content="Innoloft | B2B platform solution" />
      <meta
        name="keywords"
        content="platform building, PaaS, LoftOS, network, marketplace, development tools, cloud-based, creation, online, management"
      />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="https://pbs.twimg.com/profile_images/1178955114419240960/QAgCQ-RL_400x400.jpg" />

      {/* Open Graph tags */}
      {/* Open Graph is a technology that allows web pages to become more rich and engaging when shared on social media platforms such as Facebook, Twitter, and LinkedIn. By adding Open Graph meta tags to your web page, you can control how your page appears when it's shared on social media, including the title, description, and image that are displayed. */}
      <meta property="og:title" content="Innoloft | B2B platform solution" />
      <meta property="og:description" content=" B2B platform solution" />
      <meta property="og:image" content="" />
      <meta property="og:type" content="website" />

      {/* Twitter tags */}
      {/* Twitter meta tags are similar to Open Graph tags, but are used specifically for Twitter. They allow you to control how your web page appears when it's shared on Twitter, including the title, description, and image that are displayed. */}
      <meta name="twitter:title" content="Innoloft | B2B platform solution" />
      <meta name="twitter:description" content=" B2B platform solution" />
    </Head>
  );
};
