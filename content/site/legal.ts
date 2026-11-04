/**
 * Legal page TEMPLATES. These are generic starting points, NOT legal advice.
 * Have a qualified lawyer review and adapt them to your jurisdiction before launch.
 */
export const legalDocs: Record<string, { title: string; markdown: string }> = {
  terms: {
    title: "Terms of Service",
    markdown: `## 1. Who we are
These Terms govern your use of [BRAND NAME] ("we", "us"), operated by [Legal entity name placeholder].

## 2. Your account
You must provide accurate information and keep your login details confidential. Accounts are for one person only; sharing access is not permitted.

## 3. Licence to use course content
When you buy a course you receive a personal, non-transferable, non-exclusive licence to access it for the access period shown at purchase. You may not copy, record, resell, share or publicly distribute any video, note, question or other material.

## 4. Payments
Prices are shown on the pricing page and charged in INR unless stated otherwise. Taxes may apply. Coupons cannot be combined unless stated.

## 5. Refunds
Refunds are governed by our Refund Policy.

## 6. Exam outcomes
We do not guarantee any exam result. CFA® and FRM® exams are administered by independent organisations that are not affiliated with us.

## 7. Acceptable use
Do not attempt to bypass access controls, scrape content, upload harmful code or harass other users in discussions.

## 8. Changes and termination
We may update these Terms and will notify you of material changes. We may suspend accounts that breach these Terms.

## 9. Liability
To the extent permitted by law, our total liability is limited to the amount you paid for the relevant course.

## 10. Governing law
These Terms are governed by the laws of [Jurisdiction placeholder].

## 11. Contact
Questions about these Terms: [contact email placeholder].`,
  },
  privacy: {
    title: "Privacy Policy",
    markdown: `## 1. Information we collect
- **Account data:** name, email address, password (stored hashed by the authentication provider).
- **Purchase data:** order details. Card or UPI details are processed by the payment gateway and never stored by us.
- **Learning data:** lesson progress, quiz answers, notes, bookmarks and flashcard history.
- **Technical data:** device, browser and usage logs needed to run and secure the service.

## 2. How we use it
To provide courses, track your progress, process payments, provide support, send important service emails and, with your consent, marketing emails.

## 3. Legal bases
Contract performance, legitimate interests (security, product improvement) and consent where required.

## 4. Sharing
With service providers acting for us (hosting, payments, video, email) under data-processing agreements. We do not sell personal data.

## 5. Retention
Account and learning data are kept while your account is active and for [retention period placeholder] afterwards.

## 6. Your rights
Depending on your location you may access, correct, delete or export your data, and withdraw consent. Contact [contact email placeholder].

## 7. Cookies and local storage
We use essential cookies/local storage to keep you signed in and remember preferences. Analytics cookies are used only with consent.

## 8. Children
The service is not directed at children under 16.

## 9. Changes
We will post updates here and notify you of material changes.`,
  },
  refund: {
    title: "Refund Policy",
    markdown: `## 1. Refund window
You may request a full refund within **[7] days** of purchase if you have completed less than **[10%]** of the course lessons.

## 2. How to request
Email [support email placeholder] with your order ID. Refunds are processed to the original payment method within [5-10] business days after approval.

## 3. Non-refundable cases
- Requests after the refund window or above the completion threshold.
- Bundles where any included course has been substantially used.
- Accounts suspended for breaching the Terms (for example, content sharing).

## 4. Upgrades
When upgrading from Self-Study to Premium, only the difference is charged, and the upgrade amount is refundable under the same conditions.

## 5. Technical problems
If a technical problem on our side prevents you from using the course and we cannot fix it, we will offer a refund or an access extension.`,
  },
};
