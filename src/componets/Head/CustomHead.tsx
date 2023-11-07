// components/Head.js
import Head from 'next/head';

const CustomHead = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default CustomHead;
