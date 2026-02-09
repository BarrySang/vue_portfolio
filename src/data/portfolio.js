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
      organization: 'AutoXpress Kenya',
      position: 'Light Vehicle Mechanic III – Training & Internship',
      duration: 'July 2024 – December 2025'
    },
    {
      organization: 'Chemomi Tea Factory',
      position: 'Technical Division',
      duration: 'September 2023 – December 2023'
    },
    {
      organization: 'Salim Wazaran Kenya',
      position: 'Technical Department',
      duration: 'September 2022 – November 2022'
    },
    {
      organization: 'DigitalSelf',
      position: 'Frontend Web Developer',
      duration: 'January 2021'
    },
    {
      organization: 'Studio48',
      position: 'Backend Web Developer',
      duration: 'April 2020 – May 2020'
    },
    {
      organization: 'Kapsabet Bible College',
      position: 'Assistant Computer Teacher',
      duration: 'May 2019 – August 2019'
    }
  ]
}
