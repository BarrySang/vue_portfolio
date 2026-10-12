export function getRepos() {
  return fetch('https://api.github.com/users/BarrySang/repos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      return response.json()
    })
}

export function getAcademicData() {
  return [
    {
      course: 'Bachelors Degree: Mechanical and Manufacturing Engineering',
      school: 'Multimedia University of Kenya',
      duration: '2018 - 2023',
      coursework: [
        'Technical Drawing',
        'Computer Programming in C++',
        'Material Science',
        'Computer-Aided Design and Drawing'
      ]
    },
    {
      course: 'Certificate in Java Programming',
      school: 'East African Institute of Certified Studies',
      duration: 'August 2018 - September 2018'
    }
  ]
}

export function getWorkExperience() {
  return [
    {
      organization: 'AutoXpress Kenya',
      position: 'Technician II – Light Vehicle Mechanic',
      duration: 'March 2026 – Present',
      responsibilities: [
        'Diagnose vehicle electrical and mechanical faults using diagnostic equipment and circuit testing.',
        'Perform routine servicing and scheduled maintenance to manufacturer specifications.',
        'Overhaul brakes, including pad and disc replacement, fluid flushing, and disc skimming.',
        'Replace shock absorbers, coil springs, and worn suspension bushes.',
        'Perform wheel alignment, balancing, tyre replacement, and puncture repairs.',
        'Record work performed, parts replaced, and vehicle service histories while maintaining workshop safety.'
      ],
      skills: [
        'Vehicle diagnostics',
        'Electrical circuit testing',
        'Routine servicing',
        'Brake systems',
        'Suspension and steering',
        'Wheel alignment and balancing',
        'Tyre care',
        'Service documentation',
        'Workshop safety'
      ]
    },
    {
      organization: 'AutoXpress Kenya',
      position: 'Light Vehicle Mechanic III – Internship',
      duration: 'October 2024 – December 2024',
      responsibilities: [
        'Assisted senior technicians with vehicle diagnostics and routine mechanical checks.',
        'Replaced brake discs and pads, shock absorbers, wiper blades, and tyres.',
        'Performed pre- and post-service inspections to verify repairs and vehicle roadworthiness.'
      ],
      skills: [
        'Vehicle diagnostics',
        'Mechanical inspection',
        'Brake systems',
        'Suspension repair',
        'Tyre and wiper replacement',
        'Service quality checks'
      ]
    },
    {
      organization: 'Chemomi Tea Factory',
      position: 'Technical Division Attachment',
      duration: 'September 2023 – December 2023',
      responsibilities: [
        'Operated and maintained hydraulic systems, tea-processing machinery, and factory utility vehicles.',
        'Assisted with C.T.C. rolling machines and configured automated packing machinery.',
        'Performed routine maintenance, blade replacement, mechanical repairs, and welding and fabrication.'
      ],
      skills: [
        'Hydraulic systems',
        'Tea-processing machinery',
        'Automated packing equipment',
        'Preventive maintenance',
        'Mechanical repair',
        'Welding and fabrication'
      ]
    },
    {
      organization: 'Salim Wazaran Kenya',
      position: 'Technical Department Attachment',
      duration: 'September 2022 – November 2022',
      responsibilities: [
        'Maintained and repaired flour-processing machinery, conveyor systems, and motor housings.',
        'Operated flour sieving and mixing systems and cleared machinery blockages.',
        'Repaired steam-line plumbing and assisted with factory electrical wiring installations.'
      ],
      skills: [
        'Industrial machinery',
        'Conveyor systems',
        'Flour processing',
        'Mechanical maintenance',
        'Steam-line plumbing',
        'Electrical wiring',
        'Welding'
      ]
    },
    {
      organization: 'DigitalSelf',
      position: 'Frontend Web Developer (Contract)',
      duration: 'January 2021',
      responsibilities: [
        'Built responsive page-level user interface components with React.js.',
        'Integrated CAPTCHA verification to reduce spam submissions.',
        'Implemented PayPal payments and verified the integration using sandbox testing.'
      ],
      skills: [
        'React.js',
        'Responsive UI development',
        'CAPTCHA integration',
        'PayPal integration',
        'Sandbox testing'
      ]
    },
    {
      organization: 'Studio48',
      position: 'Backend Web Developer (Contract)',
      duration: 'April 2020 – May 2020',
      responsibilities: [
        'Created and ran Laravel database migrations to add product data and manage tables, columns, and relationships.',
        'Updated e-commerce content and user interface pages using Laravel Blade templates.'
      ],
      skills: [
        'Laravel',
        'PHP',
        'Database migrations',
        'MySQL',
        'Database relationships',
        'Blade templating',
        'E-commerce'
      ]
    },
    {
      organization: 'Kapsabet Bible College',
      position: 'Assistant Computer Teacher',
      duration: 'May 2019 – August 2019',
      responsibilities: [
        'Taught practical Microsoft Office sessions.',
        'Introduced students to fundamental computing and networking concepts.'
      ],
      skills: [
        'Microsoft Office',
        'Computer fundamentals',
        'Networking fundamentals',
        'Practical instruction'
      ]
    }
  ]
}