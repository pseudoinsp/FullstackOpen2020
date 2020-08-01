// new types
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

export interface DescriptedPart extends CoursePartBase {
    description: string;  
}

export interface CoursePartOne extends DescriptedPart {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends DescriptedPart {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export interface CoursePartFour extends DescriptedPart {
    name: "State handling";
}
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;