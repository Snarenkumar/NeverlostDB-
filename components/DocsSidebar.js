'use client';

export default function DocsSidebar({ sections, activeSection, onSectionClick }) {
  return (
    <aside className="docs-sidebar">
      <nav>
        <ul className="docs-sidebar-nav">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`docs-sidebar-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => onSectionClick(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
