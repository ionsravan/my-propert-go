
import { useRouter } from 'next/router';
import React from 'react';
import { Footer, Navbar } from 'src/componets';


const PrivacyPolicy = () => {
    const router = useRouter()

    return <>
        {/* <h1>PrivacyP</h1> */}

        <Navbar />
        <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Privacy Policy</h1>

                <section className="mb-6">
                    <p className="text-sm sm:text-base leading-relaxed">
                        Wonderplots Realty Private Limited operates the  <span onClick={() => router.push("/")} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>www.wonderplots.com</span> website, which provides the SERVICE.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service from  <span onClick={() => router.push("/")} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>www.wonderplots.com</span> website.</p>
                    <p className="text-sm sm:text-base leading-relaxed">If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                    <p className="text-sm sm:text-base leading-relaxed">The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at wonderplots.com, unless otherwise defined in this Privacy Policy.</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Information Collection and Use</h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Log Files </h2>

                    <p className="text-sm sm:text-base leading-relaxed">wonderplots follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Cookies </h2>

                    <p className="text-sm sm:text-base leading-relaxed">Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">Our website uses these "cookies" to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our WonderPlots Services.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Security </h2>

                    <p className="text-sm sm:text-base leading-relaxed">We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                    </p>

                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Links to Other Sites </h2>

                    <p className="text-sm sm:text-base leading-relaxed">Our Service may also contain links to other sites. If you click on a third-party link, you will be directed to that particular site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                    </p>

                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Third Party Privacy Policies
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed">wonderplots's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                    </p>

                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Children’s Privacy
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed">Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions and our team will confirm you back.
                    </p>


                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Privacy Rights (Do Not Sell My Personal Information)
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed">Under the privacy rights, among other rights, Indian consumers have the right to:

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers. Request that a business delete any personal data about the consumer that a business has collected. Request that a business that sells a consumer's personal data, not sell the consumer's personal data. If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.

                    </p>


                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">GDPR Data Protection Rights
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">The right to erasure – You have the right to request that we erase your personal data, under certain conditions.

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.


                    </p>



                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Changes to This Privacy Policy
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed">We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Contact Us
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed">If you have any queries or suggestions about our Privacy Policy, do not hesitate to contact us. Or mail us to Contact@wonderplots.com 
                    </p>
                </section>
            </div>
        </div>
        <Footer />


    </>
}
export default PrivacyPolicy;
