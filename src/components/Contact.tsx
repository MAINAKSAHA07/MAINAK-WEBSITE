import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { mainResumePdfHref } from '../constants/resumeUrls';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_0m1sx4t';
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_i3y94q5';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '8XeqMzGkb4xXmNV1Q';

    const templateParams = {
      // Send multiple formats to gracefully hit any standard email JS template configs
      user_name: formData.name,
      from_name: formData.name,
      name: formData.name,
      user_email: formData.email,
      reply_to: formData.email,
      email: formData.email,
      message: formData.message,
      to_name: 'Mainak',
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Success!', response.status, response.text);
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((error) => {
        console.error('Failed...', error);
        setStatus('Failed to send message. Please check console.');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-transparent text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/mainaksaha07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-[#b49bff] transition-colors"
                  aria-label="Visit my GitHub profile"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mainaksaha08/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-[#b49bff] transition-colors"
                  aria-label="Visit my LinkedIn profile"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:msaha4@asu.edu"
                  className="text-gray-200 hover:text-[#b49bff] transition-colors"
                  aria-label="Send me an email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-4">Resume</h3>
              <p className="text-gray-400 mb-4">
                Download my resume to learn more about my experience and skills.
              </p>
              <a
                href={mainResumePdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary text-center text-white cursor-pointer rounded-lg px-4 py-2 inline-flex items-center justify-center"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[rgba(3,0,20,0.8)] shadow-[0_0_10px_#bf97ff3d] border border-[rgba(112,66,248,0.38)] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b49bff]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[rgba(3,0,20,0.8)] shadow-[0_0_10px_#bf97ff3d] border border-[rgba(112,66,248,0.38)] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b49bff]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-[rgba(3,0,20,0.8)] shadow-[0_0_10px_#bf97ff3d] border border-[rgba(112,66,248,0.38)] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b49bff]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="button-primary flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors w-full sm:w-auto mt-4"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>

            {status && (
              <p className="mt-4 text-sm text-gray-300">
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
