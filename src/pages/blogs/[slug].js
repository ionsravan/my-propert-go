import { useRouter } from 'next/router';
import react from 'react'
import { BsArrowLeft } from 'react-icons/bs';
// Dummy function to fetch blog content based on the slug
// const getBlogContent = async (slug) => {
//     // Simulating an API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Dummy blog content
//     const blogContent = {
//         title: `Blog ${slug.slice(4)}`,
//         content: `This is the content of Blog ${slug.slice(4)}.`,
//     };

//     return blogContent;
// };

const BlogPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    // Fetch the blog content based on the slug
    // const blogContent = getBlogContent(slug);

    // if (!blogContent) {
    //     return <div>Loading...</div>; // Add a loading indicator if needed
    // }


    const description = `Reinvention often comes in spurts, after a long period of silence. Just as modern architecture recently enjoyed a comeback, brand architecture, a field with well-established principles for decades, is back in the limelight.

Simply understood, brand architecture is the art and science of structuring the portfolio to meet your strategic goals, defining the brand number, scope, and relationships needed to compete. Just as Modern Architecture prioritized function, a Brand Architecture is only as good as it is well-suited for the purpose it strives to achieve. Given the disruption observed today across industries and segments, it’s no wonder that companies are considering structural rather than topical solutions to the challenges they face.

Yet the context in which brand architecture decisions are being made has changed. Gone are the days of “competitive strategy”, with the military-inspired view of competition as a zero-sum game, where market share needs to be stolen from competitors, often in a street-by-street battle to win over each individual segment. The type of brand architecture required to win in this game demanded a dogged focus on each segment, and a sniper-like collection of individual brands sharply focused on each one. While there was always a place for a variety of architectures — see Joachimsthaler’s brand relationship spectrum — houses of brands were favored, as it enabled segment-by-segment competition and risk protection. P&G was the king of houses of brands, slicing and dicing the market not just by products and demographics, but also by psychographics, price range, buying patterns or attitudes. In B2B, houses of brands were omnipresent, with a product-driven logic that led to branding new features meant to provide short-term competitive advantage.

In today’s day and age, companies like Google or Amazon do not pursue growth through incremental market share gains; rather, they focus on understanding their customers’ needs and creating entirely new markets to answer them. Creating a house of brands for these markets would be folly — not only would each brand need to be created from scratch, increasing the already significant investment, but the new category itself often needs to be explained to consumers, compounding the cost.

Instead, investing in a strong master brand-led architecture and putting multiple if not all brands under the leadership of a strong brand, presents numerous advantages. First, mergers and acquisitions, or partnerships, are making it necessary to bring multiple market participants to “the same page” — and this common ground often involves a master brand recognized by all. Second, the risk profile of a “branded house” architecture has changed: the master brand can create an aura of innovation and risk-taking, supporting the launch of new products. Third, investments can be streamlined, as a strong master brand can be leveraged across markets and product launches. Finally, a track record of success in creating new categories can create goodwill, creating a virtual circle of success. To achieve this, brand architecture does not need to be a pure “branded house” — in many cases, a strong master brand creates substantial leverage and a much cleaner portfolio, even as a few particularly strong brands can continue existing as sub-brands. An example of this is Salesforce, that leverages its master brand consistently — yet allows more independence to a few specific sub-brands, such as Pardot.

There are 3 key imperatives to build this type of brand architecture — to be clear, meaningful and stretchable.

Clear: Just as modern architecture thrives on clear and clean lines, so does brand architecture. In the age of micro-segmentation, micro-targeting, information overload and digital fragmentation, you need a clear and loud voice in order to stand out. In the context of short attention spans where specific moments and needstates need to be targeted in addition to consumer/customer profiles, multiple brands often lead to confusion. The technology space understood this early, where clear and simple architectures that bring together simple design, as Apple, with complex technology, as SAP — always under the discipline of a rigorously simple way to organize.

In addition, one of the key reasons for the regained popularity of clean, streamlined architectures, often organized around a single master brand, has been the emergence of platforms, or 2-way marketplaces structured around mutual value creation. By definition, bringing various stakeholder groups to one platform requires building a single brand, in order to enable network effects so critical for building scale. As Uber expands into different marketplaces and “uberizes” different industries, leveraging the power of its master brand is likely to lead to faster expansion than building a targeted brand for each industry from scratch.

Meaningful: Just as modern architecture prioritizes function over embellishments, a solid brand architecture is founded on brands and values meaningful to consumers (or customers), rather than product feature distinctions. Brand architecture needs to be re-organized around brands that have a “reason for being” compelling enough to elicit passion, and introducing a clear distinction between brands that merit air time with consumers vs. “clutter”. The “decluttering” trend is gaining traction in brand architecture — just as in the popular consumer “decluttering” technique, only brands that “bring joy” to consumers get the spotlight. TED, for example, leverages the powerful TED master brand, positioned around “ideas worth spreading”, in a set of sub-brands that target meaningful occasions and contexts for intellectual exploration (TED Talks, TEDx, TED-Ed, TED Prize, TED Fellows, TED Institute, TED Radio Hour).

Stretchable: Modern architecture is dynamic — it finds its force in the midst of usage; movement is often embedded into its very bones. In today’s fast-changing world, brand architecture is a moving target — clients increasingly ask to design architectures that fit their growth ambitions, thinking through future growth scenarios and architecting space for the future product pipeline. In particular in industries undergoing disruption, where next generation products aim to upset the status quo, their addition to any brand architecture may require a fundamental rethink.

Much as strategy has become “real time” as the window for strategic planning has shortened, brand architecture is also becoming more “real time”, requiring more frequent reassessment, adaptations and flexibility as markets change. Witness the frequency with which Uber readjusts its portfolio. WeWork, the popular co-working space, also exploits the strength of the master brand to stretch into near-in categories such as hospitality with WeLive or the ventures space with WeWork Labs.

Traditionally, companies considered a house of brands architecture as a risk management tool — a way not to put all your eggs in one basket. It turns out, in the age of platforms and digital disruption, a masterbrand-led architecture can help you build a bigger basket, to hold more eggs.`;


const renderParagraphs = (description) => {
    const paragraphs = description.split("\n\n");
    const jsxElements = [];
  
    paragraphs.forEach((paragraph, index) => {
      jsxElements.push(<p key={index}>{paragraph}</p>);
  
      if (index !== paragraphs.length - 1) {
        jsxElements.push(<br key={`br-${index}`} />);
      }
    });
  
    return jsxElements;
  };




    return <>

        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column" }} className="slugContainer">
            <div style={{ width: "70%", display: "flex", alignItems: "center", flexDirection: "column" }} className="containers">
                <p style={{ margin: "15px 0", color: "blue",marginTop:"30px" }}>TECHNOLOGY</p>
                <p style={{ margin: "15px 0", fontSize: "35px", fontWeight: "bold",textAlign:"center",width:"80%",lineHeight:"40px" }}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                <div style={{ display: "flex", alignItems: "center", margin:"0 0",marginBottom:"30px" }} className="autohorContainer">
                    <div style={{ width: "45px", height: "45px", borderRadius: "50%",marginRight:"15px" }} className="authorImageDiv">
                        <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                    </div>
                    <div style={{padding:"10px 0"}} className="authorInfoDiv">
                    <p style={{ color: "grey", marginRight: "15px" }}>Mario Sanchez</p>
                    <p style={{ color: "grey", marginBottom: "5px" }}>October 21, 2022  8min read</p>
                    </div>
                  
                </div>
                <div style={{ borderRadius: "10px",  width: "100%",height:"600px",marginTop:"15px" }} className="imageContainers">
                    <img style={{ width: "100%",height:"100%", objectFit: "cover", borderRadius: "10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                </div>
                <div  style={{width:"80%",margin:"15px 0"}}>{renderParagraphs(description)}</div>
                <p style={{display:"flex",alignItems:"center",color:"blue",cursor:"pointer"}}><BsArrowLeft style={{color:"blue"}}/>View all posts</p>

            </div>

<div style={{display:"flex",width: "70%",padding:"30px",alignItems:"center",backgroundColor:"rgb(250,250,250)",borderRadius:"20px",marginTop:"30px"}} className="authorCard">
<div style={{ width: "150px", height: "100px", borderRadius: "50%",marginRight:"25px" }} className="authorImgDiv">
  <img
    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    alt=""
  />
</div>
    <div style={{display:"flex",flexDirection:"column"}} className="authorInfoDiv">
        <p style={{marginBottom:"10px",fontWeight:"bold",fontSize:"20px"}}>About Mario Sanchez</p>
        <p style={{marginBottom:"10px",color:"grey"}}>Mario is a Staff Engineer specialising in Frontend at Vercel, as well as being a co-founder of Acme and the content management system Sanity. Prior to this, he was a Senior Engineer at Apple.</p>
        <p style={{color:"blue"}}>View Profile</p>
    </div>
</div>

<p style={{marginTop:"70px"}}>Copyright © 2023 Stablo. All rights reserved.</p>

        </div>

    </>
};

export default BlogPage;
