import React from 'react';
import './GradientButton.css';

export function GradientButton({ children, className, href, onClick, ...props }) {
  const content = (
    <>
      <span className="gradient-btn-wrapper">
        <span className="gradient-btn-bg" />
      </span>
      <div className="gradient-btn-inner">
        {children}
      </div>
      <span className="gradient-btn-bottom-glow" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`gradient-btn ${className || ''}`} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={`gradient-btn ${className || ''}`} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
