'use client';

export default function DatabaseCard({ index, db, onChange }) {
  const handleChange = (field, value) => {
    onChange(index, { ...db, [field]: value });
  };

  const dbTypeIcon = db.type === 'mongodb' ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6v12" />
      <path d="M8 10c0-2 1.8-4 4-4s4 2 4 4-1.8 3-4 4" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );

  return (
    <div className="db-card">
      <div className="db-card-header">
        <div className="db-card-title">
          {dbTypeIcon}
          Database {index + 1}
        </div>
        <span className="badge badge-accent">{db.role}</span>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor={`db-type-${index}`}>Database Type</label>
        <select
          id={`db-type-${index}`}
          className="form-select"
          value={db.type}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="mongodb">MongoDB</option>
          <option value="supabase">Supabase / PostgreSQL</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor={`db-url-${index}`}>Connection URL</label>
        <input
          id={`db-url-${index}`}
          type="text"
          className="form-input"
          placeholder={db.type === 'mongodb' ? 'mongodb+srv://user:pass@cluster.mongodb.net/mydb' : 'postgresql://user:pass@host:5432/mydb'}
          value={db.url}
          onChange={(e) => handleChange('url', e.target.value)}
        />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          This stays in your browser — we never send or store it.
        </span>
      </div>

      <div className="form-group">
        <label className="form-label">Role</label>
        <div className="form-radio-group">
          {['primary', 'secondary', 'backup-only'].map((role) => (
            <label
              key={role}
              className={`form-radio-label ${db.role === role ? 'active' : ''}`}
            >
              <input
                type="radio"
                name={`role-${index}`}
                value={role}
                checked={db.role === role}
                onChange={(e) => handleChange('role', e.target.value)}
              />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
