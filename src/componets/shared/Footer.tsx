import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";

const opts = [
  {
    title: "Services",
    items: [
      "Mobile Apps",
      "Our Services",
      "Price Trends",
      "Post Your Property",
      "Builders in india",
      "Area converter",
      "Articles",
      "Customer Service",
      "Sitemap",
    ],
  },
  {
    title: "Company",
    items: [
      "About us",
      "Contact us",
      "Careers with us",
      "Terms& Condtions",
      "Request info",
      "Feedback",
      "Report a problem",
      "Testimonials",
      "Privacy Policy",
      "Summons/Notices",
      "Grievances",
      "Safty Guide",
    ],
  },
];

interface Props {
  title: string;
  items: string[];
}
const Seciont = ({ title, items }: Props) => {
  return (
    <div className="space-y-4 text-sm">
      <h1 className="font-semibold text-white">{title}</h1>
      {items?.map((item, index) => {
        return (
          <p className="text-white/70" key={index}>
            {item}
          </p>
        );
      })}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-4 gap-y-16 px-32 pt-16 pb-36 bg-primaryDark">
      <div className="space-y-8">
        <p className="text-xs text-white/60 max-w-xs leading-normal">
          We provide information about properties such as houses, villas and
          apartments to help people find their dream home
        </p>
        <div className="flex text-2xl space-x-4 items-center">
          <GrFacebookOption className="text-primaryBlue" />
          <GrTwitter className="text-primaryBlue" />
          <GrInstagram className="text-primaryBlue" />
        </div>
      </div>
      {opts?.map((item, index) => {
        return <Seciont key={index} items={item?.items} title={item.title} />;
      })}
      <div className="space-y-5">
        <h1 className="font-semibold text-white">Contact Us</h1>
        <div>
          <p className="text-xs text-white/75 max-w-xs leading-normal">
            Toll Free - 1800 41 99099
          </p>
          <p className="text-xs text-white/75 max-w-xs leading-normal">
            Monday - Saturday (9:00AM to 11:00PM IST)
          </p>
        </div>
        <div>
          <p className="text-xs text-white/75 max-w-xs leading-normal">
            Email-
          </p>
          <p className="text-xs text-white/75 max-w-xs leading-normal">
            Feedback@mypropertyGo.com)
          </p>
        </div>

        <div>
          <h2 className="text-white text-lg">Download App</h2>
          <div>
            <p className="text-xs text-white/75 max-w-xs leading-normal">
              Usage of 99acres.com to upload content showing area in non
              standard units or which enables targeting by
              religion/community/caste/race is prohibited. Please report
              inappropriate content by writing to us at
            </p>
          </div>
        </div>
        <div>
          <p className="text-white/90">
            All rights reserved - info Edge (india)
          </p>

          <div className="text-white/90">LTD.</div>
          <p className="text-white/90">A naukari.com venture</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
