import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = 'service_0m1sx4t';
    const templateID = 'template_ygcx4z3';
    const userID = '8XeqMzGkb4xXmNV1Q';  // Your EmailJS public key

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('Success!', response.status, response.text);
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((error) => {
        console.error('Failed...', error);
        setStatus('Failed to send message. Please try again later.');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-16">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/mainaksaha07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Visit my GitHub profile"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mainaksaha08/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Visit my LinkedIn profile"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:msaha4@asu.edu"
                  className="text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Send me an email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Resume</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Download my resume to learn more about my experience and skills.
              </p>
              <a
                href="/assets/MAINAKSAHA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-md hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>

            {status && (
              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
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
