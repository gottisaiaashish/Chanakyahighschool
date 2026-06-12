import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, MessageCircle, MonitorPlay, FlaskConical, FileText, Heart } from 'lucide-react';
import './WhyChooseUs.css';

const features = [
  {
    title: "Best IIT Foundation",
    subtitle: "Special coaching from Class 6",
    icon: <BookOpen size={24} />,
  },
  {
    title: "Spoken English",
    subtitle: "Building confidence & fluency",
    icon: <MessageCircle size={24} />,
  },
  {
    title: "Smart Classrooms",
    subtitle: "Interactive digital learning",
    icon: <MonitorPlay size={24} />,
  },
  {
    title: "Practical Labs",
    subtitle: "Hands-on science & computers",
    icon: <FlaskConical size={24} />,
  },
  {
    title: "Daily Slip Tests",
    subtitle: "Regular progress tracking",
    icon: <FileText size={24} />,
  },
  {
    title: "Value Education",
    subtitle: "Teaching life skills & behavior",
    icon: <Heart size={24} />,
  },
];

export function WhyChooseUs() {
  return (
    <div className="why-choose-container">
      {/* LEFT SIDE - Scrolling Loop */}
      <div className="why-choose-left">
        <div className="why-choose-card">
          <div className="why-choose-scroll-area">
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              }}
            >
              {[...features, ...features].map((feature, i) => (
                <div key={i} className="why-choose-item">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="why-choose-icon-box">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="why-choose-text-title">{feature.title}</div>
                      <div className="why-choose-text-sub">{feature.subtitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Fade Overlays */}
            <div className="why-choose-fade-top" />
            <div className="why-choose-fade-bottom" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Content */}
      <div className="why-choose-right">
        <span className="badge" style={{ background: 'rgba(4, 30, 66, 0.1)', color: 'var(--primary)', marginBottom: '0.5rem', display: 'inline-block' }}>
          Excellence in Education
        </span>
        <h3>
          Empowering your child's future
          <span>
            We go beyond traditional textbooks to provide a holistic, modern education. From early IIT foundation to smart digital classrooms and life skills, Chanakya High School ensures every student is prepared for real-world success.
          </span>
        </h3>

        <div className="why-choose-badges">
          <div className="why-choose-badge">Expert Faculty</div>
          <div className="why-choose-badge">Modern Campus</div>
          <div className="why-choose-badge">Holistic Learning</div>
        </div>
      </div>
    </div>
  );
}
