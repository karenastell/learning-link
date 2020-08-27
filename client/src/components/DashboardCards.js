import React from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';
import SingleDashCard from '../components/SingleDashCard';

export default function DashboardCard({ result }) {
  console.log(result, "this is the results in the singledashcard")

  return (
    <>
    <h1>{result.firstName}</h1>
      {/* {results.map((person) => (<SingleDashCard/>) )} */}

    </>
  );
}
