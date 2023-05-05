import axios from "axios";
import { Grade } from "../types/Grade";
import { Wilder } from "../types/Wilder";

interface AddGradesProps {
    newWilderData: Wilder
}

export async function addGrades({newWilderData}: AddGradesProps){
    for(const skill of newWilderData.skills){
        await axios.post('http://localhost:5000/api/grade', {
            wilder: newWilderData.name,
            skill: skill.title,
            grade: skill.votes 
        })
    }
    
}

interface DeleteGradesProps {
    oldGrades: Grade[]
    newWilderData: Wilder
}

export async function deleteOldGrades({oldGrades, newWilderData} : DeleteGradesProps){
    const gradesToDelete = oldGrades.filter(grade => !newWilderData.skills.find(editedSkill => grade.title === editedSkill.title));
    for(const grade of gradesToDelete){
        await axios.delete('http://localhost:5000/api/grade', {
            data: {
                wilderName: newWilderData.name,
                gradeToDelete: grade
            }
        });
    }
}