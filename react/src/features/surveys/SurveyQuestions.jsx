import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import QuestionEditor from "./QuestionEditor";
import { v4 as uuidv4 } from "uuid";

const SurveyQuestions = ({ questions, onQuestionsUpdate }) => {
  const [myQuestions, setMyQuestions] = useState([...questions]);

  const addQuestion = (index) => {
    index = index !== undefined ? index : myQuestions.length;

    myQuestions.splice(index, 0, {
      id: uuidv4(),
      type: "text",
      question: "",
      description: "",
      data: {},
    });

    setMyQuestions([...myQuestions]);

    onQuestionsUpdate(myQuestions);
  };

  const changeQuestion = (question) => {
    if (!question) {
      return;
    }

    const newQuestions = myQuestions.map((q) => {
      if (q.id == question.id) {
        return { ...question };
      }
      return q;
    });
    
    setMyQuestions(newQuestions);

    onQuestionsUpdate(newQuestions);
  };

  const deleteQuestion = (question) => {
    const newQuestions = myQuestions.filter((q) => q.id !== question.id);

    setMyQuestions(newQuestions);

    onQuestionsUpdate(newQuestions);
  };

  useEffect(() => {
    setMyQuestions(questions);
  }, [questions]);

  return (
    <div className="border-t-2 border-black p-5">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl">Questions</h3>
        <Button onClick={() => addQuestion()} color="black">
          Add Question
        </Button>
      </div>

      {myQuestions.length ? (
        <div className="space-y-3 my-6">
          {myQuestions.map((q, index) => (
            <QuestionEditor
              key={q.id}
              index={index}
              question={q}
              changeQuestion={changeQuestion}
              addQuestion={addQuestion}
              deleteQuestion={deleteQuestion}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto bg-red-300 p-2 px-7 mt-2 w-fit rounded-md">
          You don't have any questions created!
        </div>
      )}
    </div>
  );
};

export default SurveyQuestions;
