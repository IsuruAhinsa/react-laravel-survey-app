import { Loading, Notify } from "notiflix";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import { Button } from "../components/Button";
import { PublicQuestionView } from "../components/PublicQuestionView";

const SurveyPublicView = () => {
  const answers = {};
  const [survey, setSurvey] = useState({ questions: [] });
  const { slug } = useParams();
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    Loading.standard();

    axiosClient
      .get(`survey/${slug}`)
      .then(({ data }) => {
        Loading.remove();
        setSurvey(data.data);
      })
      .catch(() => {
        Loading.remove();
      });
  }, []);

  const answerChanged = (question, value) => {
    answers[question.id] = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(`/survey/${survey.id}/answer`, {
        answers,
      })
      .then(() => {
        Notify.success('Thank you for participating in the survey');
        setDisable(true);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-6">
          <div className="mr-4">
            <img src={survey.image_url} alt="" />
          </div>

          <div className="col-span-5">
            <h1 className="text-3xl mb-3">{survey.title}</h1>
            <p className="text-gray-500 text-sm mb-3">
              Expire Date: {survey.expire_date}
            </p>
            <p>{survey.description}</p>
          </div>
        </div>

        <>
          <div>
            {survey.questions.map((question, index) => (
              <PublicQuestionView
                key={question.id}
                question={question}
                index={index}
                answerChanged={(val) => answerChanged(question, val)}
              />
            ))}
          </div>
          <Button disabled={disable} type="submit">Submit</Button>
        </>
      </form>
    </div>
  );
};

export default SurveyPublicView;
