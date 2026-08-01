'use client';

import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${openIndex === index ? 'open' : ''}`}
        >
          <button
            className="accordion-trigger"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <svg
              className="accordion-chevron"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
            <div className="accordion-body">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
