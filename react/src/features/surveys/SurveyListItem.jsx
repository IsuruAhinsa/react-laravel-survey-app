import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CircularButton } from "../../components/CircularButton";
import { Confirm, Notify } from "notiflix";
import axiosClient from "../../axios";

const SurveyListItem = ({ survey, getSurveys }) => {
  const navigate = useNavigate();

  const deleteSurvey = (id) => {
    Confirm.show(
      "Delete", 
      "Do you want to delete this survey?", 
      "Yes", 
      "No",
      () => {
        axiosClient.delete(`/surveys/${id}`).then(() => {
          Notify.success('Survey Deleted!');
          getSurveys();
        })
      }
      );
  };

  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div
        className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden
      hover:opacity-70 hover:cursor-pointer mb-5"
      >
        <img
          src={survey.image_url}
          alt={survey.title}
          className="object-cover pointer-events-none"
        />
      </div>

      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={survey.created_at} className="text-gray-500">
          Survey created on {survey.created_at}
        </time>
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-indigo-600 group-hover:underline">
          <Link to={`/surveys/${survey.id}`}>
            <span className="absolute inset-0" />
            {survey.title}
          </Link>
        </h3>
        <p
          className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: survey.description }}
        ></p>
      </div>

      <div className="w-full mt-8 flex items-center justify-between gap-x-4">
        <div className="text-xs leading-6">
          <p className="text-gray-900">
            Survey expired on&nbsp;
            {survey.expire_date}
          </p>
          <p className="text-gray-600">Questions: {survey.questions.length}</p>
        </div>
        <div className="space-x-3">
          <CircularButton
            onClick={() => navigate(`/surveys/${survey.id}`)}
            color="green"
          >
            <PencilIcon className="h-5 w-5" aria-hidden="true" />
          </CircularButton>
          <CircularButton onClick={() => deleteSurvey(survey.id)} color="red">
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </CircularButton>
        </div>
      </div>
    </article>
  );
};

export default SurveyListItem;
