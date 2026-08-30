# Take Home Challenge - Customer Ticket Answers

---

This file contains the answers for the Customer Ticket examples provided for the Take Home Challenge. Before we start, here's a quick explanation about labels and priorities.

Labels used:

- `sending_and_deliverability` -> Used in tickets related with email deliverability issues
- `api_errors` -> Used in tickets where we have an explicit error code, likely related with API failures
- `setup_question` -> Used in setup-related ("How do I...") tickets and questions.

Tickets are ordered per priority, where 1 is the most urgent, and 7 the least urgent.

## RES-7921 — Priority 1

**Ticket Message:**

> My emails suddenly stopped sending last night for 4 hours and thousands of magic links didn’t send. What happened? This is unacceptable.

**Label:** `sending_and_deliverability`

**Internal Notes:** 

Here, I would investigate our logs based in the provided timeframe and account to see if we can find any errors during that time and proceed accordingly. I would also use Resend's Logs to confirm none of those were delivered. 

This has been selected to escalate to Engineering, as other tickets either have documentation with guidelines on how to resolve the reported issues, or are setup-related questions.

**Prioritization Logic:** 

Potential outage with thousands of failed emails and likely a very significant customer impact. It needs fiurther investigation to ensure other customers were not affected, top prioritization given the impact for this customer and de-escalation with them to ensure they are feel heard and we acknowledge how critical this has been.

**Written response:**

> Hey FirstName!
>
> Hope this message finds you well! First, we apologize for the disruption this caused. We acknowledge how serious and impactful an interruption to email delivery is, and we want to ensure this is properly prioritized on our end.
>
> We have identified errors related to the incident during the provided timeframe (last night) and have escalated them to our Engineering team for further investigation and resolution, as they appear to have been generated from our backend. They are already aware and actively looking into what happened, the root cause, and, most importantly, how to prevent it from happening again. We will also check if we can re-trigger the failed ones for you.
>
> I will keep you informed as we have meaningful updates to share regarding the items above. In the meantime, please do not hesitate to reach out with more information or questions.
>
> Thanks in advance for your patience and comprehension while we work through this.  

**Escalation Message to Engineering:**

> Hey Engineering Team,
>
> I would like to escalate and issue from the customer ACME, who has reported that "emails stopped sending last night for 4 hours and thousands of magic links didn't send". While checking our logs, I found several occurrences of the "hypothetical failure" error happening in the timeframe they have provided, between 11 PM and 3 AM CST. It seems to have been self-healed and stable around 3:15 AM CST.
>
> That being said, may I please ask for further assistance to better understand why these errors happened and what we can do to avoid future occurrences? Also, would it be possible to re-trigger the emails that failed while this has happened?
>
> This has been very impactful for ACME and any prioritization will be appreciated, as we are looking forward to re-build trust with them after this event.
>
> Thanks in advance for your help, and please keep me posted if I can help with any further info!

---

## RES-1348 — Priority 2

**Ticket Message:**

> I'm seeing a ton of 403 errors on my account. How do I fix that?

**Label:** `api_errors`

**Internal Notes:** 

The documentation is straightforward on the cause and resolution, so steps were shared with the customer. [Reference: 403 Error Using Verified Domain](https://resend.com/docs/knowledge-base/403-error-domain-mismatch#403-error-using-verified-domain)

**Prioritization Logic:** 

Potentially indicates an authentication/authorization problem that could be broadly blocking API usage and the customer's use case. The solution is straightforward, so worth prioritizing to unblock the customer faster and it could mean they are fully blocked until the mismatch is fixed.

**Written response:**

> Hi FirstName!
>
> How are you doing today? Hope you're having a wonderful day so far!
>
> Normally, 403 errors are related to API requests using a different domain than the one you verified in Resend. For example, you verified `acme.domain.com` in Resend, but your API request uses `domain.com`.
>
> To fix these you can evaluate:
>
> **1 - Update your API request (Recommended)**
>
> If you verified `acme.domain.com`, make sure your `from` field uses that same domain. For example:
>
> ```
> resend.emails.send({
>   from: 'onboarding@sending.domain.com', // Use your verified domain here
>   to: 'user@example.com',
>   subject: 'Hello World',
>   html: '<p>Hello World</p>',
> });
> ```
>
> **Option 2: Delete and re-add the domain**
>
> 1. Delete the domain you've added in Resend
>   1. In the left-hand menu, click Domains and select the one to be deleted
>   2. Click the three dots in the top-left, and then Delete Domain
> 2. Add and verify the domain that matches what you're using in your API request
>   1. Navigate back to the Domains page, click Add Domain, and proceed from there
>   2. Check this guide if you need any further assistance while setting up the new domain
>
> I'd start with Option 1, since updating the `from` address to match your already-verified domain is usually the simplest and fastest approach to mitigate these errors.
>
> Please don't hesitate to reach out again if you need any further clarification, and I'll be happy to help!
>
> Wish you a great day ahead!

---

## RES-3485 — Priority 3

**Ticket Message:**

> When I send a request to trigger a notification, I get an error message in the system. The user does not receive the email, and the system displays an error message: ”Too many requests. You can only make 2 requests per second. See rate limit response headers for more information. Or contact support to increase rate limit.”

**Label:** `api_errors`

**Internal Notes:** 

Since the documentation reference shows the standard limit is 10, and the ticket message mentions 2, I would initially guide the customer to check their rates and increase them. If possible to impersonate or check their account on their behalf, I could change my answer and confirm this was the case to provide a more precise answer, but I didn't want to presume. 

**Prioritization Logic:** 

Likely points to a partial service disruption to the customer since they are hitting the API rate limit error, so also moving this one to the top. This could have been priority 2, but the rate limit probably means that emails are being sent, but hitting the API error for some, while RES-1348 above likely means no emails are working due to the domain mismatch. [Reference: Usage Limits](https://resend.com/docs/api-reference/rate-limit)

**Written response:**

> Hi FirstName
>
> Hope this message finds you well! Happy to help you to get this sorted out!
>
> The default maximum rate limit is 10 requests per second per team, and this applies across all API keys associated with your team. I see you mentioned a limit of 2 requests per second, so I would recommend reviewing your team's current rate limit on the [Settings Usage page](https://resend.com/settings/usage) and increasing it accordingly.
>
> If needed, you can also reduce the rate at which you make API requests. This can be done by introducing a queue mechanism or reducing the number of concurrent requests per second.
>
> Last but not least, if you still see any errors or have any special requirements that would exceed our standard rate limit (10), please keep me posted, and I will be happy to help you with the next steps!
>
> Also happy to help with any further questions!
>
> Hope you have a great day!

---

## RES-2196 — Priority 4

**Ticket Message:**

> My emails are going to the spam folder at Gmail. What can I do to stop this?

**Label:** `sending_and_deliverability`

**Internal Notes:** 

The steps can be too long for the ticket, so I'm taking the approach to send the document instead and keeping myself available for questions, avoiding an extensive response containing all steps. [Reference: How to avoid Gmail's spam folder](https://resend.com/docs/knowledge-base/how-do-i-avoid-gmails-spam-folder#how-to-avoid-gmails-spam-folder)

**Prioritization Logic:** 

The emails being delivered, but if emails are going to Spam, their visibility is likely impacted and it's an active issue on their live setup. It needs to be prioritized over the setup ones below, but it initially looks less urgent than the other ones above.

**Written response:**

> Hi FirstName
>
> Hope you are having a great day so far!
>
> We have some recommendations to help prevent this scenario in Gmail, available [here](https://resend.com/docs/knowledge-base/how-do-i-avoid-gmails-spam-folder#how-to-avoid-gmails-spam-folder).  The guide also includes relevant guidelines from Google’s Help Center, so it should give you a good overview of the recommended steps.  
>
> If you have any questions as you go through the guide or if anything is unclear, please feel free to reach out. I’ll be happy to help!  
>
> Wish you a great day ahead!

---

## RES-2984 — Priority 5

**Ticket Message:**

> How do I create an email?

**Label:** `setup_question`

**Internal Notes:** 

The customer only asks on how to set it up, so my initial idea would be sending them introductory steps and our documentation for each tech stack. I could also ask which one they will use, but it could be one extra unecessary bounce rather than already enabling the customer to proceed. [Reference: Documentation Index](https://resend.com/docs/introduction)

**Prioritization Logic:** 

Usual "how to" question, but could indicate the customer is still onboarding, which is where we get the first impression, and more frustration can be generated on not being able to finish initial steps. Still, other tickets above are current errors/failures with significant impact to active customers.

**Written response:**

> Hi FirstName
>
> Hope this message finds you well! Happy to help with this!
>
> To get started with the email creation, my recommendation would be:
>
> 1. Create your own domain. [More details can be found here.](https://resend.com/docs/add-a-domain)
> 2. [Create a Resend API key](https://resend.com/docs/create-an-api-key)
>
> Once these are handy, Resend can be set up in different tech stacks such as Node, Next, Python, and more. We have specific guides for each within this page: [https://resend.com/docs/introduction](https://resend.com/docs/introduction). Be ready to use your new domain and API generated in the initial steps.  
>
> Please let us know if you need any help or have any questions throughout the process!  
>
> I hope you have a great day and a wonderful week ahead!

---

## RES-5842 — Priority 6

**Ticket Message:**

> I need to be able to receive emails from Resend. How do I do that?

**Label:** `setup_question`

**Internal Notes:** 

Similar to number 4, also opting to send the documentation since the steps can be long for a ticket. [Reference: Receiving Emails](https://resend.com/docs/dashboard/receiving/introduction)

**Prioritization Logic:** 

Important product/setup question, but there's no indication of an ongoig issue. Other tickets indicate active issues that require more urgency. It also has self-serve documentation.

**Written response:**

> Hey FirstName
>
> Hope this message finds you well!  
>
> We have a quick start guide that walks through this setup step by step and can serve as a helpful reference [here](https://resend.com/docs/dashboard/receiving/introduction).  
>
> Please let us know if this is something you have tried and it didn’t work, or if you have any questions throughout the setup!  
>
> I hope you have a great day and a wonderful week ahead!

---

## RES-1927 — Priority 7

**Ticket Message:**

> I'm not sure how to add the TXT record at Vercel. Can you tell me how?

**Label:** `setup_question`

**Internal Notes:** 

Taking the same approach as 4 (RES-2196) and 6 (RES-5842), as the documentation is very detailed and it would be an overly extensive response for a ticket. [Reference: Vercel — TXT/SPF record](https://resend.com/docs/knowledge-base/vercel#add-txt-spf-record)

**Prioritization Logic:** 

Straightforward configuration/onboarding request with no reported production impact yet and available self-serve documentation.

**Written response:**

> Hey FirstName!
>
> How are you doing today? Hope you’re having a wonderful day so far!
>
> [Here’s a detailed step-by-step guide on how to add TXT records on Vercel](https://resend.com/docs/knowledge-base/vercel#add-txt-spf-record)  
>
> If you run into any issues while following the guide or have any questions along the way, please feel free to reach out anytime!  
>
> I hope you have a great day and a wonderful week ahead!

