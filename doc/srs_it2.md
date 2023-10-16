**\*Software Requirement Specification\***

**Problem Statement:** A few sentences to describe the problem you are trying to solve, i.e., justify why this software is needed.

- Due to expensive shipping fees, many people are unable to complete international deliveries cheaply and quickly. Our international shipping app allows users to combine their individual packages into one order so they can split and reduce their combined shipping fees. Other shipping/shopping or budgeting services do not account for this specific case, and do not have features nor the intent to cover them, so our platform is intended to bridge the disconnect between these two types of apps.
- The existing process of small international Group Orders requires a disproportionate amount of time and effort from the Group Order manager as they have to organize and keep track of the orders manually.

**Potential Clients:** Who are influenced by this problem and would benefit from the proposed solution? (i.e. the potential users)

**General app user perspectives:**

- As a user of the app, I want to be able to enter and save my personal details so the ordering process (for either shippers/buyers) can be automatic.
- As a member of a group, I want to be able to change my order status and see others’ so we can know when our group order is ready to be finalized.
- As a member of a group, I want to be able to upload an order and my items so I can contribute to a group order.
- As a member of a group, I want to be able to view the information (name, address, contact info, etc.) of other members so we can better coordinate our order.
- As a member of a group, I want to be able to view my current groups and receive other information in one central hub, so I can keep organized and check on my orders easily.
- As a member of a group, I want to store my orders in a database online so I can access them repeatedly without having to remake it each time.
- As a member of a group, I want to be able to register an account and login/logout so I can begin using the app.
- As a small business owner, I want to be able to lower the cost of shipping in order to provide higher-quality and cheaper service to my customers.
- As an international student, I want to buy products at a low price from my homeland if I am homesick or missing a specific item only available there.
- As a time-sensitive or busy person, I want to locate shipping companies and ship my items quickly and conveniently, in order to avoid having to spend time or money to use international shipping.

**Joiner’s perspective:**

- As a Group Order joiner, I want to be able to join and leave groups to be able to place discounted orders.
- As a Group Order joiner, I want to be able to enter payment information so I will be able to pay for my order online, manually or automatically.
- As a Group Order joiner, I want to be able to keep track of the Group Orders I joined and be notified on time when it’s time to pay for shipping so that I don’t miss a deadline.
- As a Group Order joiner, I want a clear breakdown of the shipping fees so that I know the manager is being fair.

**Group Order Manager’s perspective:**

- As a Group Order manager, I want to be able to add or remove members so that the group can stay cohesive. DONE
- As a Group Order manager, I want to be able to create a new group so that I can organize a new order.
- As a Group Order manager, I want to automate payment collection and joiners’ info collection so that I don’t have to manually input them into an Excel sheet.
- As a Group Order manager, I want to automate the calculation of shipping payment per joiner depending on the weight of their claims so that I can be fair when charging my joiners. DONE
- As a Group Order manager, I want to be able to set deadlines for orders so the group can get their packages in a timely manner.
- As a Group Order manager, I want to be able to checkout my group once everyone is ready so I can begin the shipping process to receive our packages.

**Shipper’s perspective (separate from member (Joiner/Manager):**

- As a shipper, I want to be able to access all available user orders so I can see which packages I am capable of delivering.
- As a shipper, I want to be able to assign or unassign myself a group order, so that I can reserve the order, keep track of it, and update it for clients as the package delivery progresses.
- As a shipper, I want to be able to update the status of a group order so my clients know the status of their packages.

**Proposed Solution:** Write a few sentences that describe how a software solution will solve the problem described above.

- Since we believe that domestic shipping fees are relatively low in comparison, the most cost-inducing part of the supply chain is international shipping. Therefore, users can use our service to combine orders of individual packages, and simultaneously reduce and divide the shipping costs between them.
- Once multiple users want to receive their orders, we calculate the total weights of their items for the total international shipping fee, and divide by the number of users, the more users participate, the higher discount they receive. The app would also weigh the shipping fee contributions fairly (e.g. users with heavier items pay more in comparison). To connect users, the app would also find orders that have similar weights, and users that live closer together to also reduce the domestic shipping fee.
- This app is not designed to support social features to connect buyers, since other apps (Instagram, Twitter, etc.) are better-suited to such. We assume the Group Order Managers have already found joiners for their group order, and have decided on the type of items they’re going to buy or the store they will be ordering from.
- We can define three user types: a Manager, a Joiner, and a Shipping Carrier

Example workflow:

![](Aspose.Words.072f1ba4-88fa-477e-a833-88c73643f522.001.jpeg)

**Functional Requirements:** List the (functional) requirements that software needs to have in order to solve the problem stated above. List these in role-goal-benefit format. It is useful to try to group the requirements into those that are essential (must have), and those which are non-essential (but nice to have).

**Must have**

1. User Registration (Role: Manager/Joiner/Shipper):
   1. Goal: To create a user account.
   1. Benefit: Allows users to participate in the shipping community, post orders, ship packages, and engage with others.
1. User Profile Management (Role: Manager/Joiner/Shipper):
   1. Goal: To edit user profiles, including personal information and payment methods.
   1. Benefit: Enables users to customize their shipment experience.
1. Item Information Management (Role: Manager/Joiner)
   1. Goal: Let users choose or input the properties of the items like the volume, weight, categories, whether it is a food or beauty product, etc.
   1. Benefit: Provide more accurate shipping information and suitable options for users.
1. Automated fees calculation (Role: Manager/Joiner)
1. Goal: Calculate the shipping fees for each user of his own situation.
2. Benefit: List the fees accurately and provide comprehensive information of the cost before they conduct the payment.
5. Order Management (Role: Manager)
   1. Goal: To keep track of order status, manage group members, calculate/minimize costs, manage deadlines, and find available shipping routes.
   1. Benefit: Allows admins to control and manage all the orders, and help address users’ possible issues.
5. User Notifications (Role: Manager/Joiner/Shipper):
   1. Goal: To notify users of shipments updates, deadlines, and other time-sensitive details.
   1. Benefit: Enhances user engagement and interaction within the platform.
5. Collect information (Role: Manager):
   1. Goal: To collect joiner’s order information by the generated form from the platform that is requested by the manager.
   1. Benefit: It allows the manager to organize the order.
5. View available orders (Role: Shipper):
1. Goal: To connect each group order to warehouses and shipping networks.
1. Benefit: It allows the shipper to do their job, and for the Joiners/Manager to receive their packages.

**Nice to have**

1. Coupons (Role: User):
   1. Goal: Input coupons provided by the different stores to use at checkout.
   1. Benefit: It attracts users to stay on use the platform.
1. Customer service (e.g. chatbot) (Role: User):
   1. Goal: Automated customer service answers common questions.
   1. Benefit: Provide a convenient way to guide the users to use the platform.
1. Shipping Routes and Management (Role: Admin)
   1. Goal: Optimal shipping time
   1. Benefit: Accelerate shipments and enhance users shipping experience
1. Admin Moderation (Role: Admin):
1. Goal: To manage and moderate user-generated content and user accounts.
1. Benefit: Maintains content quality and ensures a safe community environment.

**Non-functional Requirements:**

1. Performance:
1. Response Time (Critical):
   1. Requirement: The system must respond to user actions (e.g. adding/removing, page loading) within 2 seconds.
   1. Benefit: Ensures a responsive and user-friendly experience.
1. Scalability (Important):
1. Requirement: The system should scale horizontally to accommodate a growing user base and increasing data.
1. Benefit: Ensures the platform remains stable and performs well under increased load.
2. Reliability:
1. Availability (Critical):
   1. Requirement: The system should have an uptime of at least 99.9%.
   1. Benefit: Ensures users can access the platform reliably at all times.
1. Data Backup and Recovery (Important):
1. Requirement: Regular automated backups of user data and recipes, with the ability to recover data in case of system failures.
1. Benefit: Safeguards user-generated content and prevents data loss.
3. Security:
1. User Authentication and Authorization (Critical):
   1. Requirement: Implement secure user authentication and authorization mechanisms to protect user data and ensure privacy.
   1. Benefit: Guarantees user data confidentiality and system security.
1. Data Encryption (Important):
1. Requirement: Encrypt sensitive user data, such as passwords and personal information, during transmission and storage.
1. Benefit: Enhances data security and user trust.

**Software Architecture & Technology Stack:** Will this be a Web/desktop/mobile (all, or some other kind of) application? Would it conform to specific software architecture? What programming languages, frameworks, databases, …, will be used to develop and deploy the software?

1. Type: A web-based application accessible through standard web browsers.
1. Architecture: A client-server architecture, where the frontend (client) communicates with the backend server.
1. Programming Languages: JavaScript, HTML, and CSS for frontend, and Express.js for backend.
1. Frameworks:
   1. Frontend: React.js
   1. Backend: Express.js
1. Database: MongoDB
1. Hosting/Deployment: Heroku or GitHub pages

**Similar Apps:** List a few similar applications to the one you are developing. Don't be eager to conclude no similar app exists! There is always something similar to what you are building! Finding those will help you to better specify your project. You must be prepared to explain how your app is different from the existing ones.

1\. Amazon: it is the most commonly used shipping app for buyers in the U.S., it provides a variety of goods and multiple delivery options (time), but it does not have features like our app that allow the users to combine their orders to cut the cost.

There are many international shopping/shipping websites and budget sharing apps, but few that actually do both specifically for the purpose of lowering shipping costs like our app idea is proposing.

- International shopping/shipping
- Online shops are specifically built to be shopping sites first, and shipping sites second, which makes sense, but this leaves a gap in functionality that can be improved upon
- Many shops also focus on one specific type of product, that may be available on another site. Hence, the motivation to “share” shipping fees
- All of the following apps are for shopping, but none have budget-sharing features to split shipping costs
1. Weee!: very high shipping fees
1. Yesasia.com: may not have the intended products available
1. Amazon.com: has a large and efficient network, but it has limited stocks (hence why this is not a viable alternative for many products)
1. ShipRush: finds the cheapest shipping option for an order, but is targeted for domestic use
1. DHGate.com: may not have the intended products available
6. AliExpress: may not have the intended products available
- Budget sharing or budget-tracking apps
- Are purely for budget management and sharing, but are not related to shipping at all
- None of the following are specifically tailored to split shipping fees or place international orders
1. Honeydue
1. Splitwise
1. Zelle
1. Venmo
