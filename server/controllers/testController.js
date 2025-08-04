const Test = require('../models/Test');

/**
 * Get all available lab tests
 * @route GET /api/tests
 * @access Public
 */
const getAllTests = async (req, res) => {
  try {
    // Fetch all tests from database
    let tests = await Test.find();
    
    // If no tests exist, seed with sample data
    if (tests.length === 0) {
      console.log('No tests found, seeding database with sample data');
      await seedTests();
      tests = await Test.find();
    }
    
    res.json(tests);
  } catch (err) {
    console.error('Get tests error:', err);
    res.status(500).json({ message: 'Failed to fetch tests' });
  }
};

/**
 * Seed database with sample tests
 */
const seedTests = async () => {
  const sampleTests = [
    {
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood analysis including white blood cells, red blood cells, and platelets',
      price: 45
    },
    {
      name: 'Basic Metabolic Panel',
      description: 'Tests blood sugar, electrolytes, and kidney function markers',
      price: 65
    },
    {
      name: 'Lipid Profile',
      description: 'Cholesterol and triglyceride levels for cardiovascular health assessment',
      price: 55
    },
    {
      name: 'Thyroid Function Test (TSH)',
      description: 'Thyroid stimulating hormone test for metabolic health evaluation',
      price: 75
    },
    {
      name: 'Liver Function Panel',
      description: 'Comprehensive liver enzyme and protein tests',
      price: 85
    },
    {
      name: 'Urinalysis',
      description: 'Complete urine analysis for kidney and urinary tract health',
      price: 35
    },
    {
      name: 'Vitamin D Test',
      description: 'Measures 25-hydroxyvitamin D levels for bone health assessment',
      price: 95
    },
    {
      name: 'HbA1c (Diabetes Test)',
      description: 'Long-term blood sugar control assessment for diabetes management',
      price: 125
    }
  ];

  try {
    await Test.insertMany(sampleTests);
    console.log('Sample tests seeded successfully');
  } catch (err) {
    console.error('Error seeding tests:', err);
  }
};

// Export controller functions
module.exports = { getAllTests, seedTests };
