import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, UserPlus } from 'lucide-react';
import './AdmissionForm.css';

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function AdmissionForm() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you! Your request has been submitted. Our office will call you soon.');
    setTimeout(() => setFormStatus(''), 5000);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="admission-form-card"
    >
      <motion.div variants={FADE_IN_VARIANTS} className="admission-form-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <UserPlus size={24} color="var(--primary)" />
          <span>Admission Request</span>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="admission-form-grid" style={{ marginBottom: '1.5rem' }}>
          {/* Student Name */}
          <motion.div variants={FADE_IN_VARIANTS} className="admission-form-field">
            <label className="admission-form-label">
              Student's Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              className="admission-form-input"
              placeholder="e.g. Rahul Kumar"
              required
            />
          </motion.div>

          {/* Parent Name */}
          <motion.div variants={FADE_IN_VARIANTS} className="admission-form-field">
            <label className="admission-form-label">
              Parent/Guardian Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              className="admission-form-input"
              placeholder="Father or Mother's Name"
              required
            />
          </motion.div>

          {/* Mobile Number */}
          <motion.div variants={FADE_IN_VARIANTS} className="admission-form-field">
            <label className="admission-form-label">
              Mobile Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="tel"
              className="admission-form-input"
              placeholder="10-digit number"
              required
            />
          </motion.div>

          {/* Class Wanted */}
          <motion.div variants={FADE_IN_VARIANTS} className="admission-form-field">
            <label className="admission-form-label">
              Class Wanted <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select className="admission-form-input" required>
              <option value="">Select Class</option>
              <option value="nursery">Pre-Primary (Nursery - UKG)</option>
              <option value="primary">Primary (Class 1 - 5)</option>
              <option value="high">High School (Class 6 - 10)</option>
            </select>
          </motion.div>
        </div>

        {/* Previous School */}
        <motion.div variants={FADE_IN_VARIANTS} className="admission-form-field" style={{ marginBottom: '2rem' }}>
          <label className="admission-form-label" title="Where did the child study before?">
            Previous School Name
            <Info size={16} color="#94a3b8" />
          </label>
          <input
            type="text"
            className="admission-form-input"
            placeholder="Optional"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={FADE_IN_VARIANTS}>
          <button type="submit" className="admission-form-submit">
            Submit Request
          </button>
        </motion.div>

        {formStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1.5rem', background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.95rem', textAlign: 'center', fontWeight: 500 }}
          >
            {formStatus}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
