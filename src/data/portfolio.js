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
      duration: '2018 - 2023'
    },
    {
      course: 'Certificate in Java Programming',
      school: 'East African Institute of Certified Studies',
      duration: 'July 2018 - August 2018'
    }
  ]
}

export function getWorkExperience() {
  return [
    {
      organization: 'DigitalSelf',
      position: 'Front End Web Developer',
      duration: ''
    },
    {
      organization: 'Studio48',
      position: 'Back-end Web Developer',
      duration: ''
    },
    {
      organization: 'Kapsabet Bible College',
      position: 'Volunteer Computer Teacher',
      duration: ''
    }
  ]
}
