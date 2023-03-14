import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import SurveyListItem from "./SurveyListItem";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios.js";
import { Pagination } from "../../components/Pagination";

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const navigate = useNavigate();

  const getSurveys = (url) => {
    url = url || '/surveys';
    axiosClient
      .get(url)
      .then((res) => {
        setSurveys(res.data.data);
        setMeta(res.data.meta);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  const onPaginationClick = (link) => {
    getSurveys(link.url);
  }

  return (
    <PageWrapper
      title="Surveys"
      buttons={
        <Button onClick={() => navigate("/surveys/create")}>
          Create Survey
        </Button>
      }
    >
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {surveys.map((survey) => (
          <SurveyListItem key={survey.id} survey={survey} getSurveys={getSurveys} />
        ))}
      </div>

      <Pagination meta={meta} onPaginationClick={onPaginationClick} />
    </PageWrapper>
  );
};

export default Surveys;
