import React from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';
import SingleDashCard from '../components/SingleDashCard';

export default function DashboardCard({ results }) {
  console.log(results, "this is the results in the singledashcard")
  return (
    <>
      {results.map((person) => (<SingleDashCard/>) )}

    </>
  );
}
