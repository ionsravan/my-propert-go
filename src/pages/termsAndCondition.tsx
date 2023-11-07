
import { useRouter } from 'next/router';
import React from 'react';
import { Footer, Navbar } from 'src/componets';

const TermsAndConditions = () => {
    const router = useRouter()
    return <>
    
    <Navbar/>
        <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Terms & Conditions</h1>

                <section className="mb-6">
                    <p className="text-sm sm:text-base leading-relaxed">
                        These terms of use ("Terms") constitute a legally binding agreement between you and Wonderplots Realty Private Limited (the "Company") regarding your use of the website www.wonderplots.com (the "Site") and any services offered by the Company including but not limited to delivery of content via the Site, any mobile or internet connected device or otherwise (the "the Service").
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">Your use of the Site and services and tools are governed by the following Terms as applicable to the Company including the applicable policies which are incorporated herein by way of reference. By mere use of the Site, You shall be contracting with wonderplots Realty private limited, the owner of the Platform. These terms and conditions including the policies constitute Your binding obligations, with wonderplots.</p>
                    <p className="text-sm sm:text-base leading-relaxed">We hold the sole right to modify the Terms of Service without prior permission from You or providing notice to You. The relationship creates on You a duty to periodically check the Terms of Service and stay updated on its requirements. If You continue to use the Website or avail any of its services without registration following such change, this is deemed as consent by You to the so amended policies. Your continued use of the Website is conditioned upon your compliance with the Terms of Service, including but not limited to compliance with the Terms of Service even after alterations, if any.</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">User Login</h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        The logins for <span onClick={() => router.push("/")} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>www.wonderplots.com</span>  is been done via Google or Facebook accounts and can be changed anytime without prior notice.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">Upon login the user can be a Agent / Dealer/ Builder/ Owner. The specification for the user category can be visible only upon Submitting the request to list his/ her property. User profile is such as contact info and email information may be visible to the Builder/Dealer/ buyers or sellers or any login activity performed within the site. This happens only when the user is comfortable to showcase his name and contact info. If any changes required he/her can write mail to contact@wonderplots.com or call to the contact information of wonderplots.com</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">USER OBLIGATIONS</h2>
                    <h6 className="text-xl sm:text-2xl font-bold mb-2">You are a restricted user of this website.</h6>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="text-sm sm:text-base leading-relaxed">
                            You are bound not to cut, copy, distribute, modify, recreate, reverse engineer, distribute, disseminate, post, publish or create derivative works from, transfer, or sell any information or software obtained from the website. With our prior permission limited use may be allowed. For the removal of doubt, it is clarified that unlimited or wholesale reproduction, copying of the content for commercial or non-commercial purposes and unwarranted modification of data and information within the content of the Website is not permitted.
                        </li>
                        <li className="text-sm sm:text-base leading-relaxed">
                            You agree not to access (or attempt to access) the Website and/or the materials or Services by any means other than through the interface that is provided by the website. The use of deep-link, robot, spider or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Website or Content, or in any way reproduce or circumvent the navigational structure or presentation of the Website, materials or any Content, to obtain or attempt to obtain any materials, documents or information through any means not specifically made available through the Website. You acknowledge and agree that by accessing or using the Website or Services, You may be exposed to content from other users that You may consider offensive, indecent or otherwise objectionable. We disclaim all liabilities arising in relation to such offensive content on the Website. Further, You may report such offensive content.
                        </li>
                        <li className="text-sm sm:text-base leading-relaxed">
                            In places where this website allows you to post or upload data/information, You undertake to ensure that such material is not offensive and in accordance with applicable laws. Further, You undertake not to:
                        </li>
                    </ul>
                    <p className="text-sm sm:text-base leading-relaxed">We have no obligation to monitor the materials posted on the Website. We shall have the right to remove or edit any content that in its sole discretion violates, or is alleged to violate, any applicable law or either the spirit or letter of these Terms of Service. Notwithstanding this right, YOU REMAIN SOLELY RESPONSIBLE FOR THE CONTENT OF THE MATERIALS YOU POST ON THE WEBSITE AND IN YOUR PRIVATE MESSAGES. In no event shall We assume or have any responsibility or liability for any Content posted or for any claims, damages or losses resulting from the use of Content and/or appearance of Content on the Website. You hereby represent and warrant that You have all necessary rights in and to all Content which You provide and all information it contains and that such Content shall not infringe any proprietary or other rights of third parties or contain any libelous, tortuous, or otherwise unlawful information.</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">User titles and Definitions</h2>

                    <p className="text-sm sm:text-base leading-relaxed">
                        There are 4 categories a user lie in, such as Owner / Agent/ Dealer/ Builder.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Owner is the one who owns the properties.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Agents are the one who promote the property behalf of the owner. Owner willingness should be required to post the property on our website.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Dealer  is the one who has the mutual consent from the owner to promote his venture or property for sale or promotion purposes.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Agent  is the one who may have or has mutual consent from the owner/ Dealer /Builder to promote is venture or property for sale or promotion purposes.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Builder  is the one who has rights to sell /Promote his property or the owner property and can list his property or consult wonderplots.com for the promotions.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Wonderplots Exclusive is one category who have or has mutual consent from the owner/ Dealer /Builder to promote is venture or property for sale or promotion purposes.                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Wonderplots Colloborate is one category where Wonderplots Company collaborate with Owners or Builders or Dealers to promote their property and list them in Wonderplots.com or sell in other means to purely the promote for the sale of the property behalf of the respective category person.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Agent to Agent Colloborate is one category designated by one agent to another agent where to deal with the sale of the property listed by one or behalf of the Owner/ Builder/ Dealer.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Assigned by Owner
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Wonderplots may or may not have any special agents listing for specially to wonderplots.com .The listings provided wonderplots can be used by the wondeplots company agents for the promotion or sale / services Or Wonderplots identifies a agent or person poses as agent in the portal will be assigned to a owner if he/ she requires or requests to assign a agent in order to sell the property.
                    </p>

                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">WonderPlots Collab+</h2>
                    <p className='text-sm sm:text-base leading-relaxed'>Collab+ is special collaboration plan for all owners/ Builders/ Dealers only. Wonderplots acts as Business Promoter/ Acting seller to the respective company / Person. In this Collab+ wonderplots will have all rights to market the product behalf of the company /Owner/ Dealer. Agents/Staff under Wonderplots can only promote the Property/ Listing / Service which lies under Collab+ plan or Category. Wonderplots doesn't hold responsibility if outside agents or users registers as agents (not under wonderplots) promote the property or try to sell the property. If any issue raised or seen such events will be liable to Legal problems. Outside Agents are eligible to work as WonderPlots agents at any time and can sell the properties under WonderPlots to avail the benefits from WonderPlots. Promotion or Displaying the properties which lie under WonderPlots Collab+ plan can be done only by WonderPlots Team or Agents or Staff etc. Incase of issue raised with the Collab+ plan will be taken under consideration by WonderPlots Legal team and sorted out at the earliest.</p>

                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Submitting the Property</h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        User that can be a Agent / Dealer/ Builder/ Owner can request to list the property on wonderplots.com .Wonderplots doesn't take responsibility for such requests made by the user. If any report or issue raised by any owner or person regarding the issue will be taken under consideration and then the property/ listing will be deactivated/ deleted and therefore the property listing cannot be seen.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        The picture or videos provided by the users are not taken responsible by the wonderplots in any manner. If any disputes please call or email to contact@wonderplots.com for deactivation.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Any User agrees not to submit any property descriptions, photographs, financial, contact or other information contained in each property's data to wonderplots unless the User submitting such a Listing/Advertisement has acquired received all necessary rights and authorizations from the owner of such property or the power-of-attorney holder, including from the photographer and/or copyright owner of any photographs, to publish and advertise the said Property(s) on the User's website or on wonderplots.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Wonderplots doesn’t require approvals from any sorts to just list on the website.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Listing Upgradations/ Plans
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        The request to upgrade the property means the action for the promotion of the property or change the view / alter the descriptions of the property and change of the priority of the listed property happens upon when the request is been placed from the user only or can be done by the wonderplots itself if the user agrees or requests to upgrade only. Upon the revisions of the websites or plans or any other changes made to the website can result in the listing upgradations and its terms and conditions.  User can know the plans and rates and opt the plan from Plans page.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        The plans are purely based on Activation dates that are mentioned, If user specifies the dates for the activation then wonderplots takes into consideration, if not upon the upgradation request wonderplots will activate within 48 hrs of time or 2 working days minimum.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Payments done via API / UPI or through bank transfers are been considered upon confirmation screenshots or by Transaction ID and therefore the process for the Plan upgradation will be possible.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Wonderplots can take up for Digital marketing/ Traditional marketing strategies for all the users upon request for the sale of the property and also for the Brand building of the company(user).  Every quotation will be sent for the services offered via mail or physical form.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Request Quotes for certain Category users are considered and here wonderplots company will purely give the quotation and if the user agrees with the quotation or changed quote in certain cases will be taken as consideration and the plan upgradation or the agreed changes to the user for his request will be implemented within the agreed time. Company has all rights to deactivate the plan or ban the user to keep further requests to the company if he/she or a representing person/ company approaches to wonderplots and been flagged by company rules and regulations.
                    </p>

                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Leads
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        The Lead are basically diffrentiated into multiple types Assured Leads and Progressive Leads. Assured Leads are those where buyer category login user posts a request on particular property or page by entering his contact request or Like button or Flash Symbol button  or send approach button to where the details of the buyer/ Agent Category User will be send to the particular Listed person and the Leads will be displayed in his Leads category. Assured Leads can be collected by promoting the Listed page on any Social media or on any Lead Gen Platform. Progressive Leads are those where Leads Wonderplots Collects from any source of media like Social media or print media or in-person lead collect or  Mouth to Mouth promotions and gather the Leads of buyers who may be interested in your property or buyers who have already searched in same listed Category or areas or on his own interests. Wonderplots Never guarantee on behalf of the Leads anytime or doesn’t commit on closure of the Deals in any way.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Assigned by Owner
                    </p>


                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Map View/ Search's
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Map views are purely for the search bar results and for the property view where the users who are into certain plans can get access to Google Maps / Bing maps / Here Maps etc.or any other Services with respect to plans opted by the Users. Which doesn't apply for the properties that are listed on Wonderplots Collab+ or WP collab+ plans/properties.
                        In future the maps section may be limited or the features mentioned in associated with the plans may be changed with the terms and conditions applied to particular company which provides the services for maps. Wonderplots also may have the rights to change this maps criteria in according to the companies policies or decisions.

                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Assigned by Owner
                    </p>


                </section>
                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Services Description
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        wonderplots.com attempts to be as accurate as possible. However, wonderplots.com does not warrant that descriptions of or content of this site is accurate, complete, reliable, current, or error-free. Also, your access to the Services may also be occasionally suspended or restricted to allow for repairs, maintenance, or the introduction of new facilities or at any time without prior notice. We will attempt to limit the frequency and duration of any such suspension or restriction. wonderplots.com provides links to other sites over which wonderplots.com has no control. wonderplots.com is not responsible for the availability of such external sites or resources and does not endorse and is not responsible or liable for any content, advertising, products or other material on or available from such sites or resources.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        From time to time, we share the information of those who access our Services with the other reputable organizations whose products or services we think you might find interesting and suits to your requirements. If you do not want us to share your information with other companies or organizations, please let us know by emailing us at contact@wonderplots.com
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Persons who supply us with their telephone numbers on-line may receive telephone calls or text messages from us with information regarding new products or services or upcoming events. You hereby give specific consent to receive the telephone calls or text messages related to our Services and waive the DND registry in case you have subscribed to the same. If you do not wish to receive such telephone calls or text messages, please let us know by e-mailing us at contact@wonderplots.com
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Wonderplots have desired In-office Agents who promote the services and plans to all the users and also take responsibility for the Wonderplots Collab+ Plan(to be disclosed below)
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Mortgage services are upon request and wonderplots can introduce this service at any time with desired page or section to make user friendly and all the terms and conditions will be mentioned upon discussed with the banking services.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        User-Generated Content: If you use our user-generated content services, like posting a question, answer or blog on our Website and / or Mobile App, you should be aware that any personally identifiable information you submit there can be read, collected, or used by other users and could be used to send you unsolicited messages. We are not responsible for the personally identifiable information you choose to submit in these forums. Further we are also not responsible for the comments or remarks posted by users in those forums etc. and therefore recommend you to perform your own diligence before relying on any such information.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        wonderplots have certain services like Amalgamate Studios / Property Care / NRI Special /Celine / Builders' Pride etc. these are the services which come under Wonderplots. Wonderplots have all rights to change the services or remove the services at any movement. All the services and its offerings are clearly mentioned in the respective pages of Amalgamate Studios - Property Care  - NRI Special -Celine  -Builders' Pride . All the Prices or services request are been taken under forms and pricing will be given to all customers in quotations and then be finalised with the customer for service request confirmation, Extension of the services are purely chargeable and done with mutual consent of both the company and customer only.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Contact Information
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        If you fill out a form to contact a Sales Expert (or use any other contact forms available on our Services) or request for a callback, we may share personally identifiable information that you share with us and information about your use of our Services with the party you wanted to contact. This may include data you input such as home search criteria or Log Data that we collect as you use the Services. Sometimes, if we are working with a third party to improve the quality of connect we provide to our users, we may provide that third party with additional but limited personally identifiable information for the sole purpose of their carrying out their duty to us. By sharing the information, you agree to share your details to a third party also.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">AD's services
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        To try and bring you offers that are of interest to you, we have relationships with other companies to whom we allow to place ads on our Website and Mobile App. As a result of your visit to our Website and / or Mobile App, ad server companies may collect information such as your domain type, your IP address and clickstream information.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Refunds / Cancellations
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Any user /Customer/ Client when ever they are agreed to the terms and conditions or for the services offered and if satisfied only the payment is done by them, there will be no forceful commitments for the services and company will never do such, and any representatives claiming themselves behalf of the company is not been considered responsibility of the company. For every payment company will send a conformation receipt / invoice for the service offered.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Grievances Redressal Mechanism
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Any complaints, abuse or concerns with regards to content and or comment or breach of these terms shall be immediately informed to the Grievance Officer through email on the following email Id: contact@wonderplots.com. Any grievance so received by the Company shall be resolved within the best possible time.
                    </p>
                </section>


                <section className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Disputes and Jurisdiction
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        All disputes involving but not limited to rights conferred, compensation, refunds, and other claims will be resolved through a two-step Alternate Dispute Resolution mechanism.
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="text-sm sm:text-base leading-relaxed">
                            Stage 1: Mediation. In case of a dispute, the matter will first be attempted to be resolved by a sole mediator who is a neutral third party and will be selected at the mutual acceptance of a proposed mediator by both parties. Both parties may raise a name for the sole mediator and in the case both parties accept the proposed name, the said person shall be appointed as sole mediator. In case the parties are not able to reach a consensus within two proposed mediators, the Company reserves the right to decide who the final mediator is. The decision of the mediator is not binding on both parties.
                        </li>
                        <li className="text-sm sm:text-base leading-relaxed">
                            Stage 2: Arbitration. In case that mediation does not yield a result suitable or preferred by any one of the parties, arbitration may follow, the award of which is binding on both parties. The Arbitration Board shall comprise three members – one appointed by each party and the third member to be nominated by the two appointed members by mutual consent. Arbitration shall be held at Visakhapatnam, Andhra Pradesh, India. The proceedings of arbitration shall be in the English language. The arbitrator’s award shall be final and binding on the Parties.
                        </li>
                    </ul>
                    <p className="text-sm sm:text-base leading-relaxed">If the dispute cannot be resolved by this two-step Alternate Dispute Resolution mechanism, it shall be referred to the courts at Visakhapatnam, Andhra Pradesh, India.</p>
                    <p className="text-sm text-center sm:text-base leading-relaxed mt-10">PLEASE NOTE THE TERMS AND CONDITIONS ARE SUBJECTED TO CHANGED ACCORDING TO COMPANY POLICIES AND REQUEST THE COMPANY/ USER/ CUSTOMER TO COOPERATE.</p>
                </section>


            </div>
        </div>
        <Footer/>
        </>
};

export default TermsAndConditions;
