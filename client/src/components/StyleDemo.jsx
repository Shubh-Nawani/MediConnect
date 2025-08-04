import React from 'react';

const StyleDemo = () => {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="heading-responsive text-primary-600 mb-4">
          MediConnect Global CSS Demo
        </h1>
        <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
          A comprehensive demonstration of the global CSS system implemented for the MediConnect application.
        </p>
      </div>

      {/* Typography Section */}
      <section className="card">
        <div className="card-header">
          <h2 className="text-2xl font-semibold text-gray-900">Typography</h2>
        </div>
        <div className="card-body spacing-responsive">
          <h1>Heading 1 - Main Page Title</h1>
          <h2>Heading 2 - Section Title</h2>
          <h3>Heading 3 - Subsection Title</h3>
          <h4>Heading 4 - Component Title</h4>
          <h5>Heading 5 - Small Title</h5>
          <h6>Heading 6 - Tiny Title</h6>
          <p>
            This is a paragraph with regular text. It demonstrates the default typography styling
            with proper line height and color contrast for optimal readability in medical applications.
          </p>
          <p>
            Here's a paragraph with a <a href="#demo">link example</a> that shows the hover states
            and medical-themed blue color palette.
          </p>
        </div>
      </section>

      {/* Button Section */}
      <section className="card">
        <div className="card-header">
          <h3 className="text-xl font-semibold text-gray-900">Buttons</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Primary Buttons</h4>
              <div className="space-y-2">
                <button className="btn-primary btn-sm w-full">Small Primary</button>
                <button className="btn-primary w-full">Regular Primary</button>
                <button className="btn-primary btn-lg w-full">Large Primary</button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Secondary & States</h4>
              <div className="space-y-2">
                <button className="btn-secondary w-full">Secondary</button>
                <button className="btn-success w-full">Success</button>
                <button className="btn-warning w-full">Warning</button>
                <button className="btn-danger w-full">Danger</button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Outline & Ghost</h4>
              <div className="space-y-2">
                <button className="btn-outline-primary w-full">Outline Primary</button>
                <button className="btn-ghost w-full">Ghost Button</button>
                <button className="btn-primary w-full" disabled>Disabled Button</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements Section */}
      <section className="card">
        <div className="card-header">
          <h3 className="text-xl font-semibold text-gray-900">Form Elements</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label form-label-required">Patient Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Enter patient name"
                />
                <span className="form-help">Please enter the full legal name</span>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="input-field input-field-sm" 
                  placeholder="patient@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Medical Notes</label>
                <textarea 
                  className="input-field" 
                  rows="3"
                  placeholder="Enter medical notes or observations..."
                ></textarea>
                <span className="form-error">This field contains invalid information</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Large Input</label>
                <input 
                  type="text" 
                  className="input-field input-field-lg" 
                  placeholder="Large input field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Test Type</label>
                <select className="input-field">
                  <option>Blood Test</option>
                  <option>X-Ray</option>
                  <option>MRI Scan</option>
                  <option>Ultrasound</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical-Specific Components */}
      <section className="card">
        <div className="card-header">
          <h3 className="text-xl font-semibold text-gray-900">Medical Components</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Test Result Cards</h4>
              <div className="test-result-card">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">Blood Glucose Test</h5>
                  <span className="health-status-good">Normal</span>
                </div>
                <p className="text-gray-600 text-sm">Result: 95 mg/dL (Normal: 70-100 mg/dL)</p>
                <p className="text-gray-500 text-xs mt-1">Completed: March 15, 2024</p>
              </div>

              <div className="test-result-card">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">Blood Pressure</h5>
                  <span className="health-status-warning">Elevated</span>
                </div>
                <p className="text-gray-600 text-sm">Result: 140/90 mmHg (Normal: &lt;120/80 mmHg)</p>
                <p className="text-gray-500 text-xs mt-1">Completed: March 15, 2024</p>
              </div>

              <div className="test-result-card">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">Cholesterol</h5>
                  <span className="health-status-critical">High</span>
                </div>
                <p className="text-gray-600 text-sm">Result: 280 mg/dL (Normal: &lt;200 mg/dL)</p>
                <p className="text-gray-500 text-xs mt-1">Completed: March 15, 2024</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Appointment Cards</h4>
              <div className="appointment-card">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">General Checkup</h5>
                  <span className="badge badge-primary">Upcoming</span>
                </div>
                <p className="text-gray-600 text-sm">Dr. Sarah Johnson</p>
                <p className="text-gray-500 text-xs">March 20, 2024 at 2:00 PM</p>
              </div>

              <div className="appointment-card">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">Lab Results Review</h5>
                  <span className="badge badge-success">Completed</span>
                </div>
                <p className="text-gray-600 text-sm">Dr. Michael Chen</p>
                <p className="text-gray-500 text-xs">March 10, 2024 at 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards and Layout */}
      <section className="card">
        <div className="card-header">
          <h3 className="text-xl font-semibold text-gray-900">Cards and Layout</h3>
        </div>
        <div className="card-body">
          <div className="grid-auto-fit">
            <div className="card-hover">
              <h4 className="font-medium text-gray-900 mb-2">Hover Card</h4>
              <p className="text-gray-600 text-sm">This card has hover effects and animations.</p>
            </div>

            <div className="medical-card">
              <h4 className="font-medium text-gray-900 mb-2">Medical Card</h4>
              <p className="text-gray-600 text-sm">Special styling for medical information cards.</p>
            </div>

            <div className="card">
              <h4 className="font-medium text-gray-900 mb-2">Regular Card</h4>
              <p className="text-gray-600 text-sm">Standard card component for general content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Badges and Status Indicators */}
      <section className="card">
        <div className="card-header">
          <h3 className="text-xl font-semibold text-gray-900">Badges and Status</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Status Badges</h4>
              <div className="flex flex-wrap gap-2">
                <span className="badge-primary">Primary</span>
                <span className="badge-success">Success</span>
                <span className="badge-warning">Warning</span>
                <span className="badge-danger">Danger</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Health Status</h4>
              <div className="flex flex-wrap gap-2">
                <span className="health-status-good">Good Health</span>
                <span className="health-status-warning">Needs Attention</span>
                <span className="health-status-critical">Critical</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Loading States</h4>
              <div className="flex items-center gap-4">
                <div className="loading-spinner"></div>
                <span className="text-gray-600">Loading...</span>
                <div className="loading-spinner-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Utility Classes */}
      <section className="card">
        <div className="card-header">
          <h3 className="text-xl font-semibold text-gray-900">Utility Examples</h3>
        </div>
        <div className="card-body">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Shadow Variations</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-soft text-center">
                  <span className="text-sm text-gray-600">Soft Shadow</span>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-medium text-center">
                  <span className="text-sm text-gray-600">Medium Shadow</span>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-large text-center">
                  <span className="text-sm text-gray-600">Large Shadow</span>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-extra-large text-center">
                  <span className="text-sm text-gray-600">Extra Large</span>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Responsive Grid</h4>
              <div className="grid-auto-fit">
                <div className="p-4 bg-primary-50 rounded-lg text-center">
                  <span className="text-sm text-primary-700">Auto-fit Grid Item 1</span>
                </div>
                <div className="p-4 bg-success-50 rounded-lg text-center">
                  <span className="text-sm text-success-700">Auto-fit Grid Item 2</span>
                </div>
                <div className="p-4 bg-warning-50 rounded-lg text-center">
                  <span className="text-sm text-warning-700">Auto-fit Grid Item 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleDemo;
