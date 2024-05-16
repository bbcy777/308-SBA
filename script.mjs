// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];



function getLearnerData(course, ag, submissions) {
  //Catch Errors: check if AssignmentGroup mismatching course_id
  try{
    if (ag.course_id != course.id) {
        throw "Error - AssignmentGroup does not belong to its course.";
    }
  } catch (error) {
    console.log(error);
  }
//Catch Errors: check if points_possible = 0
  ag.assignments.forEach(row => {
  try{
    if(row.points_possible == 0){
      throw "Error -points_possible can't be 0";
    }
  } catch (error) {
    console.log(error);
  }
  })

  //compare duedate and submition date, remove assignment not due
let deleteId = [];
let scores = 0;
let weight = 0;
for (let i in submissions) {
  let assignment = submissions[i].assignment_id;
  let subDate = submissions[i].submission.submitted_at;
  let assignmentInfo={}; 

  ag.assignments.forEach((el) => {
    if (el.id == assignment) assignmentInfo = el;
    }) 

  if (subDate > assignmentInfo.due_at) {
    submissions[i].submission.score -= 0.1*assignmentInfo.points_possible;
  }
  scores = submissions[i].submission.score / assignmentInfo.points_possible;
  submissions[i].score = parseFloat(scores.toFixed(2));
  submissions[i].weight = assignmentInfo.points_possible;
  
    
  if (assignmentInfo.due_at > "2024-5-15") deleteId.push(i); 
}

  //delete not due assignment scores
for (let i of deleteId) {
  submissions.splice(i,1);
}

for (let i of submissions) {
  i.submission = i.submission.score;
}
// console.log(LearnerSubmissions);
let result = [];

const uniqueId = [...new Set(submissions.map(el => el.learner_id))];

for (let i in uniqueId) {
  let total_score = 0;
  let total_weight = 0;
  let obj = {id: uniqueId[i]};
  for (let row of submissions){
    if (row.learner_id == uniqueId[i]){
      let key_name = row.assignment_id;

      obj[key_name] = row.score;
      total_score += row.submission;
      total_weight += row.weight;
    }
  }
  obj[`avg`] = total_score / total_weight;
  result.push(obj);
}

  

    // let CourseInfo ;
    // let AssignmentGroup = ;
    // let LearnerSubmission = [];
    // {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150
    //   }
    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);