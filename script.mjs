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


//get unique learner id
function get_ids(obj, key) {
    let allId = [];
    obj.forEach(row => {  
      const value = row[key];
      if (!allId[value]){
        allId[value] = [];
      }
      allId[value].push({assignment_id: row.assignment_id, submission: row.submission});   
    })
    return allId;
}
console.log(get_ids(LearnerSubmissions, `learner_id`));

const uniqueId = [...new Set(LearnerSubmissions.map(el => el.learner_id))];
const learners = uniqueId.map(el => {
  return LearnerSubmissions.filter(obj => obj.learner_id === el);
})
console.log(learners);

//Catch Errors: check if AssignmentGroup mismatching course_id and points_possible
try{
    if (AssignmentGroup.course_id != CourseInfo.id) {
        throw "Error - AssignmentGroup does not belong to its course.";
    }
} catch (error) {
    console.log(error);
}

AssignmentGroup.assignments.forEach(row => {
  try{
    if(row.points_possible == 0){
      throw "Error -points_possible can't be 0";
    }
  } catch (error) {
    console.log(error);
  }
})



// function getLearnerData(course, ag, submission) {
//     // let CourseInfo ;
//     // let AssignmentGroup = ;
//     // let LearnerSubmission = [];
//     // {
//     //     id: 132,
//     //     avg: 0.82, // (39 + 125) / (50 + 150)
//     //     1: 0.78, // 39 / 50
//     //     2: 0.833 // late: (140 - 15) / 150
//     //   }
//     return result;
// }

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);