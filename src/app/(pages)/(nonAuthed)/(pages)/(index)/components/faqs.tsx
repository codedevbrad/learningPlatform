// components/FAQSection.js
const faqs = [
  {
    id: 1,
    question: "What is the duration of the bootcamp?",
    answer:
      "Our coding bootcamp is designed to be completed in 12 weeks of intensive training. We also offer flexible part-time options.",
  },
  {
    id: 2,
    question: "Do I need any prior coding experience?",
    answer:
      "No prior coding experience is necessary. Our curriculum is designed to start from the basics and progressively cover advanced topics.",
  },
  {
    id: 3,
    question: "What kind of job support do you offer?",
    answer:
      "We provide comprehensive job support, including resume building, interview preparation, and connections to our network of hiring partners.",
  },
  {
    id: 4,
    question: "What programming languages will I learn?",
    answer:
      "You will learn a variety of languages and technologies, including HTML, CSS, JavaScript, Python, and more, depending on your chosen track.",
  },
  // More questions...
];

export default function FAQSection() {
  return (
    <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently Asked Questions</h2>
      <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
        {faqs.map((faq) => (
          <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">{faq.question}</dt>
            <dd className="mt-4 lg:col-span-7 lg:mt-0">
              <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
