export const dataManipulation = (wilderList: any) => {
    return wilderList.map((wilder: any) => {
      const wilderGradesLean = wilder.grades.map((grade: {grade: number, skill: {name: string}}) => ({title: grade.skill.name, votes: grade.grade}))
      return {
        ...wilder,
        skills: wilderGradesLean
      }
    })
  }

export const formatWilder = (wilder: any) => {
    const wilderGradesLean = wilder.grades.map((grade: {grade: number, skill: {name: string}}) => ({title: grade.skill.name, votes: grade.grade}))
    return {
    ...wilder,
    skills: wilderGradesLean
    }
}