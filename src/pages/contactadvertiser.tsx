import { ReactElement } from "react";
import GetInTouchWithAdvertiser from "src/componets/advertiser/getIntouchForm";
import Layout from "src/Layout/main";

const ContactAdvertiser = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <GetInTouchWithAdvertiser />;
    </div>
  );
};

export default ContactAdvertiser;

ContactAdvertiser.getLayout = function getLayout(page: ReactElement) {
  return <Layout onlyNav>{page}</Layout>;
};
